// packages/runtime/src/kernel/as-hook.ts
import type {
  AsHookRuntime,
  AsHookTraceEntry,
  BorrowedStateHandle,
  DefHandle,
  RunHandle,
} from "@proto-ui/core";
import { __AS_HOOK_RUNTIME as AS_HOOK_RT } from "@proto-ui/core";
import type { PropsBaseType } from "@proto-ui/types";
import type { StatePort } from "@proto-ui/modules.state";
import { illegalPhase } from "./guard";

const TRACE_INTERNAL = Symbol.for("@proto-ui/asHook/trace-internal");

type TraceStore = {
  entries: AsHookTraceEntry[];
  nameSet: Set<string>;
};

type DefRuntimeState = {
  getPhase(): "setup" | "render" | "callback" | "unknown";
  prototypeName: string;
};

type AsHookMeta = { privileged: boolean };

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
  return !!x && typeof x === "object" && typeof x.get === "function" && !!x.__stateId;
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

    Object.defineProperty(anyProto, "__asHooks", {
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
    watch: (cb) =>
      raw.watch((ctx, e) => cb(ctx as RunHandle<P>, e as any)),
  };

  (borrowed as any).__stateId = (handle as any).__stateId;
  (borrowed as any).__stateSemantic = (handle as any).__stateSemantic;
  (borrowed as any).__stateKind = (handle as any).__stateKind;
  (borrowed as any).__stateSpec = (handle as any).__stateSpec;

  return borrowed;
}

function projectStateValue<P extends PropsBaseType>(
  port: StatePort,
  value: any
): any {
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
  if (value && typeof value === "object") {
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
  let instanceOrder = 0;
  const projectState = opt?.projectState ?? ((state: any) => state);

  const ensureSetup = (op: string) => {
    const phase = st.getPhase();
    if (phase !== "setup") {
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
