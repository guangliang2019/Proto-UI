import type { Prototype } from '@proto.ui/core';
import type { CommitSignal, RuntimeController } from '@proto.ui/runtime';
import {
  createHostWiring,
  createEventGate,
  createWebProtoEventRouter,
} from '@proto.ui/adapter-base';
import type { ExposeStateWebMode } from '@proto.ui/module-expose-state-web';
import type { RawPropsSource } from '@proto.ui/module-props';
import { PropsBaseType } from '@proto.ui/types';

import { createDefaultMetaGetter } from './platform/meta';
import { markProtoInstance } from './platform/instance-tree';
import { createVueEffectsPort } from './runtime/effects-port';
import { createVueModules } from './runtime/modules';
import { createVueHostSession } from './runtime/session';
import { renderTemplateToVue, type VueRuntime as VueRenderRuntime } from './template';

export { __VUE_PROTO_INSTANCE } from './platform/instance-tree';

export type VueRuntime = VueRenderRuntime & {
  defineComponent: (opt: any) => any;
  h: (type: any, props?: any, children?: any) => any;
  ref: <T>(v: T) => { value: T };
  shallowRef: <T>(v: T) => { value: T };
  watch: (src: any, cb: () => void, opt?: any) => void;
  onMounted: (cb: () => void) => void;
  onBeforeUnmount: (cb: () => void) => void;
  nextTick: () => Promise<void>;
};

export type VueAdapterHandle = {
  update(): void;
  getExposes(): Record<string, unknown>;
  invokeInCallbackScope?(fn: () => void): void;
};

export type VueAdapterProps<Props extends PropsBaseType> = Props &
  PropsBaseType & {
    hostClass?: string | string[] | Record<string, boolean>;
    hostStyle?: Record<string, string> | string | Array<Record<string, string>>;
    [key: `on${string}`]: unknown;
  };

export interface VueAdapterOptions<Props extends PropsBaseType> {
  schedule?: (task: () => void) => void;
  getProps?: (props: VueAdapterProps<Props>) => Partial<Props> | null | undefined;
  getMeta?: (key: string) => unknown;
  exposeStateWebMode?: ExposeStateWebMode;
  autoUpdateOnPropsChange?: boolean;
  rootTag?: string;
}

function defaultGetProps<Props extends PropsBaseType>(
  props: VueAdapterProps<Props>
): Partial<Props> {
  const { hostClass, hostStyle, ...rest } = (props ?? {}) as any;
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rest)) {
    if (isFrameworkEventProp(key, value)) continue;
    filtered[key] = value;
  }
  return filtered as Partial<Props>;
}

export function createVueAdapter(runtime: VueRuntime) {
  return function AdaptToVue<Props extends PropsBaseType>(
    proto: Prototype<Props>,
    opt: VueAdapterOptions<Props> = {}
  ) {
    const schedule = opt.schedule ?? ((task) => queueMicrotask(task));
    const getProps = opt.getProps ?? defaultGetProps;
    const getMeta = opt.getMeta ?? createDefaultMetaGetter();
    const exposeStateWebMode = opt.exposeStateWebMode;
    const autoUpdate = opt.autoUpdateOnPropsChange ?? true;
    const rootTag = opt.rootTag ?? 'div';

    return runtime.defineComponent({
      name: `Proto(${proto.name})`,
      inheritAttrs: false,
      props: {
        hostClass: { type: [String, Array, Object], default: undefined },
        hostStyle: { type: [String, Array, Object], default: undefined },
      },
      setup(props: any, ctx: any) {
        const rootRef = runtime.ref<HTMLElement | null>(null);
        const renderChildren = runtime.shallowRef<any>(null);
        const hostTokens = runtime.shallowRef<string[]>([]);
        const controllerRef = runtime.ref<RuntimeController | null>(null);
        const eventGateRef = runtime.ref<ReturnType<typeof createEventGate> | null>(null);
        const exposesRef = runtime.ref<Record<string, unknown>>({});
        const invokeRef = runtime.ref<((fn: () => void) => void) | null>(null);
        const shouldExist = runtime.ref(true);

        const subs = new Set<() => void>();
        const rawPropsSource: RawPropsSource<Props> = {
          debugName: `${proto.name}#raw-props`,
          get() {
            const nextProps = getProps({
              ...(ctx.attrs ?? {}),
              ...(props ?? {}),
            } as VueAdapterProps<Props>);
            return (nextProps ?? {}) as Readonly<Props & PropsBaseType>;
          },
          subscribe(cb) {
            subs.add(cb);
            return () => subs.delete(cb);
          },
        };

        let pendingCommit = false;
        let pendingSignal: CommitSignal | null = null;
        let hostSession: ReturnType<typeof createVueHostSession<Props>> | null = null;

        ctx.expose({
          update: () => controllerRef.value?.update(),
          getExposes: () => ({ ...(exposesRef.value ?? {}) }),
          invokeInCallbackScope: (fn: () => void) => invokeRef.value?.(fn),
        } satisfies VueAdapterHandle);

        const notifyPropsChange = () => {
          for (const cb of subs) cb();
          if (autoUpdate) controllerRef.value?.update();
        };

        runtime.watch(props as any, notifyPropsChange, { deep: true });
        runtime.watch(() => ctx.attrs, notifyPropsChange, { deep: true });

        runtime.watch(
          renderChildren,
          async () => {
            if (!pendingCommit) return;
            pendingCommit = false;
            await runtime.nextTick();
            eventGateRef.value?.enable();
            pendingSignal?.done?.();
            pendingSignal = null;
          },
          { flush: 'post' }
        );

        const initSession = () => {
          const rootEl = rootRef.value;
          if (!rootEl) return;
          if (controllerRef.value) return;

          markProtoInstance(rootEl, proto as Prototype<any>);

          const eventGate = createEventGate();
          eventGateRef.value = eventGate;

          const router = createWebProtoEventRouter({
            rootEl,
            globalEl: typeof window === 'undefined' ? rootEl : window,
            isEnabled: () => eventGate.isEnabled?.() ?? true,
          });

          const effectsPort = createVueEffectsPort((tokens) => {
            hostTokens.value = tokens;
          });

          const presenceBridge = {
            mount() {
              shouldExist.value = true;
            },
            unmount() {
              shouldExist.value = false;
            },
          };

          const modules = createVueModules({
            el: rootEl,
            router,
            emit: (key, payload, options) => {
              ctx.emit(key, payload, options);
            },
            rawPropsSource,
            effectsPort,
            getMeta,
            exposeStateWebMode,
            setExposes: (record) => {
              exposesRef.value = record;
            },
            presenceBridge,
          });

          const wiring = createHostWiring({ prototypeName: proto.name, modules });

          hostSession = createVueHostSession({
            proto,
            schedule,
            rawPropsSource,
            wiring,
            eventGate,
            router,
            onCommit: (children, signal) => {
              pendingCommit = true;
              pendingSignal = signal;
              renderChildren.value = children;
            },
            onAfterUnmount: () => {
              controllerRef.value = null;
              exposesRef.value = {};
              hostTokens.value = [];
            },
          });

          controllerRef.value = hostSession.controller as RuntimeController;
          invokeRef.value = hostSession.invokeInCallbackScope;
        };

        runtime.onMounted(initSession);

        runtime.watch(
          () => shouldExist.value,
          async (val) => {
            if (val) {
              await runtime.nextTick();
              initSession();
            } else {
              hostSession?.dispose();
              hostSession = null;
            }
          },
          { flush: 'post' }
        );

        runtime.onBeforeUnmount(() => {
          hostSession?.dispose();
          hostSession = null;
        });

        return () => {
          if (!shouldExist.value) return null;
          const slotNodes = ctx.slots.default ? ctx.slots.default() : null;
          const rendered = renderTemplateToVue(runtime, renderChildren.value, {
            slot: slotNodes as any,
          });

          return runtime.h(
            rootTag,
            {
              ref: rootRef,
              class: mergeHostClass(props.hostClass, hostTokens.value),
              style: props.hostStyle,
              'data-demo-ref': ctx.attrs['data-demo-ref'] as string | undefined,
            },
            rendered as any
          );
        };
      },
    }) as any;
  };
}

function mergeHostClass(input: unknown, hostTokens: string[]) {
  const values = [input, hostTokens.join(' ')]
    .map((value: any) => value ?? '')
    .filter((value: any) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return Object.keys(value).length > 0;
      return String(value).trim().length > 0;
    });

  const out: any[] = [];
  const seen = new Set<string>();

  for (const value of values) {
    if (typeof value !== 'string') {
      out.push(value);
      continue;
    }

    const tokens = value
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean);

    const unique = tokens.filter((token) => {
      if (seen.has(token)) return false;
      seen.add(token);
      return true;
    });

    if (unique.length > 0) out.push(unique.join(' '));
  }

  return out;
}

function isFrameworkEventProp(key: string, value: unknown) {
  return /^on[A-Z]/.test(key) && typeof value === 'function';
}
