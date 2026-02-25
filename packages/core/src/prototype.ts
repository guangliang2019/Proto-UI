// packages/core/src/prototype.ts
import type { PropsBaseType } from '@proto-ui/types';
import type { DefHandle, RendererHandle } from './handles';
import type { TemplateChildren } from './spec';

export interface Prototype<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
> {
  name: string;
  setup: (def: DefHandle<Props, Exposes>) => RenderFn | void;
}

export type ExposeOf<T> =
  T extends Prototype<any, infer E>
    ? E
    : T extends AsHookCaller<any, infer E, any, any>
      ? E
      : never;

export type RenderFn = <Props extends PropsBaseType>(
  renderer: RendererHandle<Props>
) => TemplateChildren;

export type AsHookTraceEntry = {
  name: string;
  order: number;
  privileged: boolean;
};

export type AsHookResult = {
  props?: unknown;
  state?: unknown;
  context?: unknown;
  event?: unknown;
  feedback?: unknown;
  render?: RenderFn;
  [key: string]: unknown;
};

export interface AsHookPrototype<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
  Options = unknown,
  Result extends AsHookResult = AsHookResult,
> {
  name: string;
  setup: (def: DefHandle<Props, Exposes>, options?: Options) => Result | void;
}

export type AsHookRuntime = {
  ensureSetup(op: string): void;
  register(name: string, meta: { privileged: boolean }): { run: boolean; order: number };
  projectState<T>(state: T): T;
  getTrace(): ReadonlyArray<AsHookTraceEntry>;
};

export type AsHookCaller<
  Props extends PropsBaseType = PropsBaseType,
  Exposes = Record<string, unknown>,
  Options = unknown,
  Result extends AsHookResult = AsHookResult,
> = ((options?: Options) => Result) & {
  readonly kind: 'asHook';
  readonly definition: AsHookPrototype<Props, Exposes, Options, Result>;
};

export const __AS_HOOK_RUNTIME = Symbol.for('@proto-ui/asHook/runtime');
export const __AS_HOOK_CURRENT_DEF = Symbol.for('@proto-ui/asHook/current-def');
export const __AS_HOOK_PRIV_FACADES = Symbol.for('@proto-ui/asHook/priv-facades');

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
  O = unknown,
  R extends AsHookResult = AsHookResult,
>(proto: AsHookPrototype<P, E, O, R>): AsHookCaller<P, E, O, R> {
  if (!proto || typeof proto !== 'object') {
    throw new Error(`[AsHook] defineAsHook() expects an object.`);
  }
  if (!proto.name || typeof proto.name !== 'string') {
    throw new Error(`[AsHook] illegal name.`);
  }
  if (typeof proto.setup !== 'function') {
    throw new Error(`[AsHook] setup must be a function.`);
  }
  if (!/^as[A-Z]/.test(proto.name)) {
    throw new Error(
      `[AsHook] name must start with "as" followed by Capital letter, got: ${proto.name}`
    );
  }

  const caller = ((options?: O) => {
    const def = (globalThis as any)[__AS_HOOK_CURRENT_DEF] as DefHandle<P, E> | undefined;
    if (!def) {
      throw new Error(`[AsHook] no active setup context for ${proto.name}.`);
    }

    const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
    if (!rt) {
      throw new Error(`[AsHook] runtime not available for ${proto.name}.`);
    }

    rt.ensureSetup(`asHook(${proto.name})`);
    const reg = rt.register(proto.name, { privileged: false });
    if (!reg.run) return {} as R;

    const result = (proto.setup(def, options) ?? ({} as R)) as R;
    if (result && typeof result === 'object' && 'state' in result) {
      const nextState = rt.projectState((result as any).state);
      if ((result as any).state !== nextState) {
        return { ...(result as any), state: nextState } as R;
      }
    }
    return result;
  }) as AsHookCaller<P, E, O, R>;

  Object.defineProperty(caller, 'kind', {
    value: 'asHook',
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
