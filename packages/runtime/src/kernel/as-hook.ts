// packages/runtime/src/kernel/as-hook.ts
import type {
  AsHookRuntime,
  AsHookResult,
  AsHookTraceEntry,
  BorrowedStateHandle,
  DefHandle,
  RenderFn,
  RunHandle,
} from '@proto-ui/core';
import { __AS_HOOK_RUNTIME as AS_HOOK_RT } from '@proto-ui/core';
import type { PropsBaseType } from '@proto-ui/types';
import type { StatePort } from '@proto-ui/modules.state';
import { illegalPhase } from './guard';

const TRACE_INTERNAL = Symbol.for('@proto-ui/asHook/trace-internal');

type TraceStore = {
  entries: AsHookTraceEntry[];
  nameSet: Set<string>;
};

type DefRuntimeState = {
  getPhase(): 'setup' | 'render' | 'callback' | 'unknown';
  prototypeName: string;
};

type AsHookMeta = { privileged: boolean };
type EffectKind = 'props' | 'state' | 'context' | 'event' | 'feedback';
type EffectFrame = {
  name: string;
  effects: Record<EffectKind, unknown[]>;
  parent?: EffectFrame;
};

type StateHandleLike = {
  get: () => unknown;
  setDefault?: (v: unknown) => void;
  set?: (v: unknown, reason?: unknown) => void;
  __stateId?: unknown;
  __stateSemantic?: unknown;
  __stateKind?: unknown;
  __stateSpec?: unknown;
};

function isStateHandleLike(x: any): x is StateHandleLike {
  return !!x && typeof x === 'object' && typeof x.get === 'function' && !!x.__stateId;
}

function getOrCreateTrace(proto: object): TraceStore {
  const anyProto = proto as any;
  if (!anyProto[TRACE_INTERNAL]) {
    const store: TraceStore = { entries: [], nameSet: new Set() };
    Object.defineProperty(anyProto, TRACE_INTERNAL, {
      value: store,
      enumerable: false,
      configurable: false,
      writable: false,
    });

    Object.defineProperty(anyProto, '__asHooks', {
      get: () => Object.freeze(store.entries.slice()),
      enumerable: false,
      configurable: false,
    });
  }

  return (anyProto[TRACE_INTERNAL] as TraceStore) ?? { entries: [], nameSet: new Set() };
}

function createBorrowedHandle<P extends PropsBaseType, V>(
  port: StatePort,
  handle: StateHandleLike
): BorrowedStateHandle<V, P> {
  const raw = port.createBorrowedHandle(handle as any);

  const borrowed: BorrowedStateHandle<V, P> = {
    get: () => raw.get() as V,
    setDefault: (v: V) => raw.setDefault(v),
    set: (v: V, reason?: unknown) => raw.set(v, reason),
    watch: (cb) => raw.watch((ctx, e) => cb(ctx as RunHandle<P>, e as any)),
  };

  (borrowed as any).__stateId = (handle as any).__stateId;
  (borrowed as any).__stateSemantic = (handle as any).__stateSemantic;
  (borrowed as any).__stateKind = (handle as any).__stateKind;
  (borrowed as any).__stateSpec = (handle as any).__stateSpec;

  return borrowed;
}

function projectStateValue<P extends PropsBaseType>(port: StatePort, value: any): any {
  if (isStateHandleLike(value)) {
    return createBorrowedHandle<P, any>(port, value);
  }
  if (Array.isArray(value)) {
    let changed = false;
    const mapped = value.map((v) => {
      const next = projectStateValue<P>(port, v);
      if (next !== v) changed = true;
      return next;
    });
    return changed ? mapped : value;
  }
  if (value && typeof value === 'object') {
    let changed = false;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const next = projectStateValue<P>(port, v);
      if (next !== v) changed = true;
      out[k] = next;
    }
    return changed ? out : value;
  }
  return value;
}

export function createAsHookStateProjector<P extends PropsBaseType>(
  port?: StatePort
): <T>(state: T) => T {
  if (!port) return (state) => state;
  return <T>(state: T) => projectStateValue<P>(port, state) as T;
}

export function attachAsHookRuntime<P extends PropsBaseType>(
  def: DefHandle<P, any>,
  st: DefRuntimeState,
  proto: object,
  opt?: { projectState?: <T>(state: T) => T }
): void {
  const trace = getOrCreateTrace(proto);
  const used = new Set<string>();
  const frameStack: EffectFrame[] = [];
  let instanceOrder = 0;
  const projectState = opt?.projectState ?? ((state: any) => state);

  const createFrame = (name: string, parent?: EffectFrame): EffectFrame => ({
    name,
    parent,
    effects: {
      props: [],
      state: [],
      context: [],
      event: [],
      feedback: [],
    },
  });

  const compact = (values: unknown[]): unknown => {
    if (values.length === 0) return undefined;
    if (values.length === 1) return values[0];
    return values.slice();
  };

  const ensureSetup = (op: string) => {
    const phase = st.getPhase();
    if (phase !== 'setup') {
      illegalPhase(op, st.prototypeName, phase, `Use 'asHook' in setup only.`);
    }
  };

  const runtime: AsHookRuntime = {
    ensureSetup,
    register: (name: string, meta: AsHookMeta) => {
      if (used.has(name)) return { run: false, order: -1 };
      used.add(name);

      let order = instanceOrder++;
      let entryOrder = order;
      const existing = trace.entries.find((e) => e.name === name);
      if (existing) entryOrder = existing.order;

      if (!trace.nameSet.has(name)) {
        const entry: AsHookTraceEntry = {
          name,
          order: entryOrder,
          privileged: !!meta.privileged,
        };
        trace.nameSet.add(name);
        trace.entries.push(entry);
      }

      return { run: true, order: entryOrder };
    },
    beginCapture: (name: string) => {
      const parent = frameStack.length > 0 ? frameStack[frameStack.length - 1] : undefined;
      frameStack.push(createFrame(name, parent));
    },
    recordCaptured: (kind: EffectKind, entry: unknown) => {
      if (frameStack.length === 0) return;
      const frame = frameStack[frameStack.length - 1];
      frame.effects[kind].push(entry);
    },
    endCapture: (render?: RenderFn): AsHookResult => {
      const frame = frameStack.pop();
      if (!frame) return render ? { render } : {};

      if (frame.parent) {
        for (const kind of Object.keys(frame.effects) as EffectKind[]) {
          frame.parent.effects[kind].push(...frame.effects[kind]);
        }
      }

      const result: AsHookResult = {};
      const props = compact(frame.effects.props);
      const state = compact(frame.effects.state);
      const context = compact(frame.effects.context);
      const event = compact(frame.effects.event);
      const feedback = compact(frame.effects.feedback);

      if (typeof props !== 'undefined') result.props = props;
      if (typeof state !== 'undefined') result.state = state;
      if (typeof context !== 'undefined') result.context = context;
      if (typeof event !== 'undefined') result.event = event;
      if (typeof feedback !== 'undefined') result.feedback = feedback;
      if (typeof render === 'function') result.render = render;

      return result;
    },
    abortCapture: () => {
      if (frameStack.length === 0) return;
      frameStack.pop();
    },
    projectState: <T>(state: T): T => {
      return projectState(state);
    },
    getTrace: () => trace.entries.slice(),
  };

  Object.defineProperty(def as any, AS_HOOK_RT, {
    value: runtime,
    enumerable: false,
    configurable: false,
    writable: false,
  });
}
