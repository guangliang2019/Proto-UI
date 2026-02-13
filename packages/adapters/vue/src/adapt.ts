// packages/adapters/vue/src/adapt.ts
import type { Prototype, EffectsPort, StyleHandle } from '@proto-ui/core';
import { mergeTwTokensV0 } from '@proto-ui/core';
import type { CommitSignal, RuntimeController } from '@proto-ui/runtime';
import { PropsBaseType } from '@proto-ui/types';

import {
  createCapsWiring,
  createHostWiring,
  createEventGate,
  createAdapterHost,
  createWebProtoEventRouter,
} from '@proto-ui/adapters.base';

import { renderTemplateToVue, type VueRuntime as VueRenderRuntime } from './template';

import type { RawPropsSource } from '@proto-ui/modules.props';
import type { ExposeStateWebMode } from '@proto-ui/modules.expose-state-web';

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

export const __VUE_PROTO_INSTANCE = Symbol.for('@proto-ui/adapters.vue/__proto_instance');
const PROTO_BY_INSTANCE = new WeakMap<HTMLElement, Prototype<any>>();

function isProtoInstance(node: Node | null): node is HTMLElement {
  if (!node || !(node as any)) return false;
  return (node as any)[__VUE_PROTO_INSTANCE] === true;
}

function getProtoParent(instance: HTMLElement): HTMLElement | null {
  let cur: Node | null = instance.parentNode;
  while (cur) {
    if (typeof ShadowRoot !== 'undefined' && cur instanceof ShadowRoot) {
      cur = cur.host;
      continue;
    }
    if (isProtoInstance(cur)) return cur as HTMLElement;
    cur = cur.parentNode;
  }
  return null;
}

export type VueAdapterHandle = {
  update(): void;
  getExposes(): Record<string, unknown>;
};

export type VueAdapterProps<Props extends PropsBaseType> = Props &
  PropsBaseType & {
    hostClass?: string | string[] | Record<string, boolean>;
    hostStyle?: Record<string, string> | string | Array<Record<string, string>>;
  };

export interface VueAdapterOptions<Props extends PropsBaseType> {
  schedule?: (task: () => void) => void;
  getProps?: (props: VueAdapterProps<Props>) => Partial<Props> | null | undefined;
  exposeStateWebMode?: ExposeStateWebMode;
  autoUpdateOnPropsChange?: boolean;
  rootTag?: string;
}

function defaultGetProps<Props extends PropsBaseType>(
  props: VueAdapterProps<Props>
): Partial<Props> {
  const { hostClass, hostStyle, ...rest } = (props ?? {}) as any;
  return rest as Partial<Props>;
}

function createVueEffectsPort(setHostTokens: (next: string[]) => void): EffectsPort {
  let latest: StyleHandle | null = null;
  let flushing = false;

  const flush = () => {
    if (flushing) return;
    flushing = true;
    try {
      const h = latest;
      if (!h) return;
      if (h.kind === 'tw') {
        const merged = mergeTwTokensV0(h.tokens).tokens;
        setHostTokens(merged);
      }
    } finally {
      flushing = false;
    }
  };

  return {
    queueStyle(handle) {
      latest = handle;
    },
    requestFlush() {
      flush();
    },
    flushNow() {
      flush();
    },
  };
}

function createNameMap(semantic: string) {
  const base = semantic
    .trim()
    .replace(/\s+/g, '-')
    .replace(/\./g, '-')
    .replace(/[^a-zA-Z0-9\-]/g, '-')
    .toLowerCase();
  return {
    dataAttr: `data-${base}`,
    cssVar: `--pui-${base}`,
  };
}

export function createVueAdapter(runtime: VueRuntime) {
  return function AdaptToVue<Props extends PropsBaseType>(
    proto: Prototype<Props>,
    opt: VueAdapterOptions<Props> = {}
  ) {
    const schedule = opt.schedule ?? ((task) => queueMicrotask(task));
    const getProps = opt.getProps ?? defaultGetProps;
    const exposeStateWebMode = opt.exposeStateWebMode;
    const autoUpdate = opt.autoUpdateOnPropsChange ?? true;
    const rootTag = opt.rootTag ?? 'div';

    return runtime.defineComponent({
      name: `Proto(${proto.name})`,
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
        const routerRef = runtime.ref<ReturnType<typeof createWebProtoEventRouter> | null>(null);
        const wiringRef = runtime.ref<ReturnType<typeof createHostWiring> | null>(null);

        const exposesRef = runtime.ref<Record<string, unknown>>({});

        const subs = new Set<() => void>();
        const rawPropsSource: RawPropsSource<Props> = {
          debugName: `${proto.name}#raw-props`,
          get() {
            const p = getProps(props as unknown as VueAdapterProps<Props>);
            return (p ?? {}) as Readonly<Props & PropsBaseType>;
          },
          subscribe(cb) {
            subs.add(cb);
            return () => subs.delete(cb);
          },
        };

        let pendingCommit = false;
        let pendingSignal: CommitSignal | null = null;
        let hostSession: ReturnType<typeof createAdapterHost<Props>> | null = null;

        ctx.expose({
          update: () => controllerRef.value?.update(),
          getExposes: () => ({ ...(exposesRef.value ?? {}) }),
        } as VueAdapterHandle);

        runtime.watch(
          props as any,
          () => {
            for (const cb of subs) cb();
            if (autoUpdate) controllerRef.value?.update();
          },
          { deep: true }
        );

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

        runtime.onMounted(() => {
          const rootEl = rootRef.value;
          if (!rootEl) return;
          if (controllerRef.value) return;

          (rootEl as any)[__VUE_PROTO_INSTANCE] = true;
          PROTO_BY_INSTANCE.set(rootEl, proto as Prototype<any>);

          const eventGate = createEventGate();
          eventGateRef.value = eventGate;

          const router = createWebProtoEventRouter({
            rootEl,
            globalEl: typeof window === 'undefined' ? rootEl : window,
            isEnabled: () => eventGate.isEnabled?.() ?? true,
          });
          routerRef.value = router;

          const effectsPort: EffectsPort = createVueEffectsPort((tokens) => {
            hostTokens.value = tokens;
          });

          const modules = createCapsWiring()
            .useProps(rawPropsSource)
            .useFeedback(effectsPort)
            .useEventTargets({
              root: () => router.rootTarget,
              global: () => router.globalTarget,
            })
            .useExposeState((record) => {
              exposesRef.value = record ?? {};
            })
            .useExposeStateWeb({
              host: rootEl,
              nameMap: createNameMap,
              mode: exposeStateWebMode,
            })
            .useContext({
              instance: rootEl,
              parent: (inst) => getProtoParent(inst as HTMLElement),
            })
            .useAsTrigger({
              instance: rootEl,
              parent: (inst) => getProtoParent(inst as HTMLElement),
              getPrototype: (inst) => PROTO_BY_INSTANCE.get(inst as HTMLElement) ?? null,
            })
            .build();

          const wiring = createHostWiring({ prototypeName: proto.name, modules });
          wiringRef.value = wiring;

          hostSession = createAdapterHost(
            proto,
            {
              getRawProps: () => rawPropsSource.get() as Readonly<Props & PropsBaseType>,
              schedule,
              commit: (children, signal) => {
                eventGate.disable();
                pendingCommit = true;
                pendingSignal = signal ?? null;
                renderChildren.value = children;
              },
            },
            {
              onRuntimeReady: (wiringApi) => {
                wiring.onRuntimeReady(wiringApi);
              },
              onUnmountBegin: () => {
                eventGate.disable();
              },
              afterUnmount: () => {
                wiring.afterUnmount();
                eventGate.dispose();
                router.dispose();

                controllerRef.value = null;
                exposesRef.value = {};
              },
            }
          );

          controllerRef.value = hostSession.controller as RuntimeController;
        });

        runtime.onBeforeUnmount(() => {
          hostSession?.dispose();
          hostSession = null;
        });

        return () => {
          const slotNodes = ctx.slots.default ? ctx.slots.default() : null;
          const rendered = renderTemplateToVue(runtime, renderChildren.value, {
            slot: slotNodes as any,
          });

          const hostClass = [props.hostClass, hostTokens.value.join(' ')]
            .map((x: any) => x ?? '')
            .filter((x: any) => {
              if (Array.isArray(x)) return x.length > 0;
              if (typeof x === 'object') return Object.keys(x).length > 0;
              return String(x).trim().length > 0;
            });

          return runtime.h(
            rootTag,
            {
              ref: rootRef,
              class: hostClass,
              style: props.hostStyle,
            },
            rendered as any
          );
        };
      },
    }) as any;
  };
}
