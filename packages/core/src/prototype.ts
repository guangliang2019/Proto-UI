// packages/core/src/prototype.ts
import type { PropsBaseType } from '@proto.ui/types';
import type { DefHandle, RendererHandle } from './handles';
import type { TemplateChildren } from './spec';
import type { BorrowedStateHandle, State } from './state';
import { getActiveAsHookContext } from './internal';

export interface Prototype<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
> {
  name: string;
  setup: (def: DefHandle<Props, Exposes>) => RenderFn | void;
}

export type ExposeOf<T> =
  T extends Prototype<any, infer E> ? E : T extends AsHookCaller<any, infer E> ? E : never;

export type RenderFn = <Props extends PropsBaseType>(
  renderer: RendererHandle<Props>
) => TemplateChildren;

export type AsHookTraceEntry = {
  name: string;
  order: number;
  privileged: boolean;
  mode?: AsHookMode;
};

export type AsHookMode = 'configurable' | 'once' | 'multiple';

export type AsHookStateMap = Record<string, State<any>>;
export type AsHookEventMap = Record<string, unknown>;
export type AsHookDisposer = () => void;

export type AsHookContract = {
  state?: AsHookStateMap;
  event?: AsHookEventMap;
};

type NormalizeAsHookContract<C> = C extends AsHookContract
  ? {
      state: C['state'] extends AsHookStateMap ? C['state'] : {};
      event: C['event'] extends AsHookEventMap ? C['event'] : {};
    }
  : C extends AsHookStateMap
    ? { state: C; event: {} }
    : { state: {}; event: {} };

type AsHookStatesOf<C> = NormalizeAsHookContract<C>['state'];
type AsHookEventsOf<C> = NormalizeAsHookContract<C>['event'];

export type AsHookDisposers = Readonly<{
  all: readonly AsHookDisposer[];
  props?: readonly AsHookDisposer[];
  context?: readonly AsHookDisposer[];
  event?: readonly AsHookDisposer[];
  feedback?: readonly AsHookDisposer[];
  rule?: readonly AsHookDisposer[];
}>;

export type AsHookBorrowedStates<
  Props extends PropsBaseType,
  States extends AsHookStateMap,
> = Readonly<{
  [K in keyof States]: States[K] extends State<infer V> ? BorrowedStateHandle<V, Props> : never;
}>;

export type AsHookEventKeys<Events extends AsHookEventMap> = Readonly<{
  [K in keyof Events & string]: K;
}>;

export type AsHookArtifacts<
  Props extends PropsBaseType = PropsBaseType,
  ContractInput = {},
> = Readonly<{
  stateHandles?: AsHookBorrowedStates<Props, AsHookStatesOf<ContractInput>>;
  eventKeys?: AsHookEventKeys<AsHookEventsOf<ContractInput>>;
  methods?: Readonly<Record<string, unknown>>;
}>;

export type AsHookResult<Props extends PropsBaseType = PropsBaseType, ContractInput = {}> = {
  props?: unknown;
  state?: unknown;
  stateHandles?: AsHookBorrowedStates<Props, AsHookStatesOf<ContractInput>>;
  getState?: <K extends keyof AsHookStatesOf<ContractInput> & string>(
    key: K
  ) => AsHookBorrowedStates<Props, AsHookStatesOf<ContractInput>>[K] | undefined;
  methods?: Readonly<Record<string, unknown>>;
  getMethod?: <K extends string>(key: K) => unknown;
  artifacts?: AsHookArtifacts<Props, ContractInput>;
  disposers?: AsHookDisposers;
  context?: unknown;
  event?: unknown;
  feedback?: unknown;
  render?: RenderFn;
  [key: string]: unknown;
};

export type AsHookInstanceState = {
  store: Record<string, unknown>;
  result?: AsHookResult<any, any>;
};

export type AsHookConfigApi = AsHookInstanceState & {
  name: string;
  order: number;
};

export type AsHookConfigureTools = {
  warn(message: string): void;
  conflict(message: string): never;
};

export type AsHookPrototype<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
  ContractInput = {},
  Options = void,
> = {
  name: string;
  mode?: AsHookMode;
  setup: (
    def: DefHandle<Props, Exposes>,
    options: Options,
    api: AsHookConfigApi
  ) => RenderFn | void;
  configure?: (api: AsHookConfigApi, options: Options, tools: AsHookConfigureTools) => void;
};

export type AsHookRuntime = {
  ensureSetup(op: string): void;
  register(
    name: string,
    meta: { privileged: boolean; mode?: AsHookMode }
  ): {
    action: 'setup' | 'configure' | 'skip';
    order: number;
    state: AsHookInstanceState;
  };
  beginCapture(name: string): void;
  recordCaptured(kind: 'props' | 'state' | 'context' | 'event' | 'feedback', entry: unknown): void;
  endCapture(render?: RenderFn): AsHookResult<any, any>;
  abortCapture(): void;
  projectState<T>(state: T): T;
  getTrace(): ReadonlyArray<AsHookTraceEntry>;
};

export type AsHookCaller<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
  ContractInput = {},
  Options = void,
> = ((options?: Options) => AsHookResult<Props, ContractInput>) & {
  readonly kind: 'asHook';
  readonly definition: AsHookPrototype<Props, Exposes, ContractInput, Options>;
};

export type HookContract = AsHookContract;
export type HookStateMap = AsHookStateMap;
export type HookEventMap = AsHookEventMap;
export type HookDisposer = AsHookDisposer;
export type HookDisposers = AsHookDisposers;
export type HookBorrowedStates<
  Props extends PropsBaseType,
  States extends HookStateMap,
> = AsHookBorrowedStates<Props, States>;
export type HookEventKeys<Events extends HookEventMap> = AsHookEventKeys<Events>;
export type HookArtifacts<
  Props extends PropsBaseType = PropsBaseType,
  ContractInput = {},
> = AsHookArtifacts<Props, ContractInput>;
export type HookResult<
  Props extends PropsBaseType = PropsBaseType,
  ContractInput = {},
> = AsHookResult<Props, ContractInput>;
export type HookInstanceState = AsHookInstanceState;
export type HookConfigApi = AsHookConfigApi;
export type HookConfigureTools = AsHookConfigureTools;
export type HookPrototype<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
  ContractInput = {},
  Options = void,
> = AsHookPrototype<Props, Exposes, ContractInput, Options>;
export type HookRuntime = AsHookRuntime;
export type HookCaller<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
  ContractInput = {},
  Options = void,
> = ((options?: Options) => HookResult<Props, ContractInput>) & {
  readonly kind: 'hook';
  readonly definition: HookPrototype<Props, Exposes, ContractInput, Options>;
};

function normalizeAsHookRender(value: RenderFn | void): RenderFn | undefined {
  if (typeof value !== 'undefined' && typeof value !== 'function') {
    throw new Error(`[AsHook] setup() must return render function or void, got: ${typeof value}.`);
  }
  return typeof value === 'function' ? value : undefined;
}

/** Thin wrapper: stabilize author-facing entry & improve inference */
export function definePrototype<P extends PropsBaseType, E = Record<string, unknown>>(
  proto: Prototype<P, E>
): Prototype<P, E> {
  if (!proto || typeof proto !== 'object') {
    throw new Error(`[Prototype] definePrototype() expects an object.`);
  }
  if (!proto.name || typeof proto.name !== 'string') {
    throw new Error(`[Prototype] illegal name.`);
  }
  if (typeof proto.setup !== 'function') {
    throw new Error(`[Prototype] setup must be a function.`);
  }
  return proto;
}

/**
 * AsHook is still "a prototype authored by Component Author",
 * but its *import result* will be treated as borrowed in the future.
 */
export function defineAsHook<
  P extends PropsBaseType,
  E = Record<string, unknown>,
  C = {},
  O = void,
>(proto: AsHookPrototype<P, E, C, O>): AsHookCaller<P, E, C, O>;
export function defineAsHook<
  P extends PropsBaseType,
  E = Record<string, unknown>,
  C = {},
  O = void,
>(proto: AsHookPrototype<P, E, C, O>): AsHookCaller<P, E, C, O> {
  return createHookCaller(proto, 'asHook') as AsHookCaller<P, E, C, O>;
}

function createHookCaller<P extends PropsBaseType, E = Record<string, unknown>, C = {}, O = void>(
  proto: AsHookPrototype<P, E, C, O>,
  kind: 'asHook' | 'hook'
) {
  if (!proto || typeof proto !== 'object') {
    throw new Error(`[${kind === 'hook' ? 'Hook' : 'AsHook'}] define expects an object.`);
  }
  if (!proto.name || typeof proto.name !== 'string') {
    throw new Error(`[${kind === 'hook' ? 'Hook' : 'AsHook'}] illegal name.`);
  }
  if (typeof proto.setup !== 'function') {
    throw new Error(`[${kind === 'hook' ? 'Hook' : 'AsHook'}] setup must be a function.`);
  }
  // TODO: 寻找更可靠的验证函数名
  // if (!/^as[A-Z]/.test(proto.name)) {
  //   throw new Error(
  //     `[AsHook] name must start with "as" followed by Capital letter, got: ${proto.name}`
  //   );
  // }

  const caller = ((options?: O) => {
    const { def: activeDef, rt } = getActiveAsHookContext(proto.name);
    const def = activeDef as DefHandle<P, E>;

    rt.ensureSetup(`asHook(${proto.name})`);
    const reg = rt.register(proto.name, {
      privileged: false,
      mode: proto.mode ?? 'configurable',
    });
    const api: AsHookConfigApi = {
      name: proto.name,
      order: reg.order,
      store: reg.state.store,
    };
    const tools: AsHookConfigureTools = {
      warn(message: string) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn(`[AsHook:${proto.name}] ${message}`);
        }
      },
      conflict(message: string): never {
        throw new Error(`[AsHook:${proto.name}] ${message}`);
      },
    };

    if (reg.action === 'skip') {
      return reg.state.result ?? {};
    }

    if (reg.action === 'setup') {
      rt.beginCapture(proto.name);
      try {
        const render = normalizeAsHookRender(proto.setup(def, options as O, api));
        const result = rt.endCapture(render);
        let finalResult = result;
        if (result && typeof result === 'object' && 'state' in result) {
          const nextState = rt.projectState((result as any).state);
          if ((result as any).state !== nextState) {
            finalResult = { ...(result as any), state: nextState };
          }
        }
        reg.state.result = finalResult;
        if (
          (proto.mode ?? 'configurable') === 'configurable' &&
          typeof proto.configure === 'function'
        ) {
          proto.configure(api, options as O, tools);
        }
        return reg.state.result ?? {};
      } catch (e) {
        rt.abortCapture();
        throw e;
      }
    }

    if (typeof proto.configure === 'function') {
      proto.configure(api, options as O, tools);
    }
    return reg.state.result ?? {};
  }) as AsHookCaller<P, E, C, O> | HookCaller<P, E, C, O>;

  Object.defineProperty(caller, 'kind', {
    value: kind,
    enumerable: false,
    configurable: false,
    writable: false,
  });
  Object.defineProperty(caller, 'definition', {
    value: proto,
    enumerable: false,
    configurable: false,
    writable: false,
  });

  return caller;
}

export function defineHook<P extends PropsBaseType, E = Record<string, unknown>, C = {}, O = void>(
  proto: HookPrototype<P, E, C, O>
): HookCaller<P, E, C, O> {
  return createHookCaller(proto as AsHookPrototype<P, E, C, O>, 'hook') as HookCaller<P, E, C, O>;
}
