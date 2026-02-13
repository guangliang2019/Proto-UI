// packages/adapters/react/src/adapt.ts
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

import { renderTemplateToReact, type ReactRuntime as ReactRenderRuntime } from './template';

import type { RawPropsSource } from '@proto-ui/modules.props';
import type { ExposeStateWebMode } from '@proto-ui/modules.expose-state-web';

export type ReactRuntime = ReactRenderRuntime & {
  useState: <T>(init: T) => [T, (next: T) => void];
  useRef: <T>(init: T) => { current: T };
  useEffect: (cb: () => void | (() => void), deps?: any[]) => void;
  useLayoutEffect: (cb: () => void | (() => void), deps?: any[]) => void;
  useImperativeHandle: (ref: any, create: () => any, deps?: any[]) => void;
  forwardRef: (render: (props: any, ref: any) => any) => any;
  createElement: (type: any, props: any, ...children: any[]) => any;
};

export const __REACT_PROTO_INSTANCE = Symbol.for('@proto-ui/adapters.react/__proto_instance');
const PROTO_BY_INSTANCE = new WeakMap<HTMLElement, Prototype<any>>();

function isProtoInstance(node: Node | null): node is HTMLElement {
  if (!node || !(node as any)) return false;
  return (node as any)[__REACT_PROTO_INSTANCE] === true;
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

export type ReactAdapterHandle = {
  update(): void;
  getExposes(): Record<string, unknown>;
};

export type ReactAdapterProps<Props extends PropsBaseType> = Props &
  PropsBaseType & {
    children?: any;
    hostClassName?: string;
    hostStyle?: any;
  };

export interface ReactAdapterOptions<Props extends PropsBaseType> {
  schedule?: (task: () => void) => void;
  getProps?: (props: ReactAdapterProps<Props>) => Partial<Props> | null | undefined;
  exposeStateWebMode?: ExposeStateWebMode;
  autoUpdateOnPropsChange?: boolean;
  rootTag?: string;
}

function defaultGetProps<Props extends PropsBaseType>(
  props: ReactAdapterProps<Props>
): Partial<Props> {
  const { children, hostClassName, hostStyle, ...rest } = (props ?? {}) as any;
  return rest as Partial<Props>;
}

function createReactEffectsPort(setHostTokens: (next: string[]) => void): EffectsPort {
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

export function createReactAdapter(runtime: ReactRuntime) {
  return function AdaptToReact<Props extends PropsBaseType>(
    proto: Prototype<Props>,
    opt: ReactAdapterOptions<Props> = {}
  ) {
    const schedule = opt.schedule ?? ((task) => queueMicrotask(task));
    const getProps = opt.getProps ?? defaultGetProps;
    const exposeStateWebMode = opt.exposeStateWebMode;
    const autoUpdate = opt.autoUpdateOnPropsChange ?? true;
    const rootTag = opt.rootTag ?? 'div';

    const Component = runtime.forwardRef((props: ReactAdapterProps<Props>, ref: any) => {
      const rootRef = runtime.useRef<HTMLElement | null>(null);
      const [renderChildren, setRenderChildren] = runtime.useState<any>(null);
      const [hostTokens, setHostTokens] = runtime.useState<string[]>([]);

      const controllerRef = runtime.useRef<RuntimeController | null>(null);
      const eventGateRef = runtime.useRef<ReturnType<typeof createEventGate> | null>(null);
      const routerRef = runtime.useRef<ReturnType<typeof createWebProtoEventRouter> | null>(null);

      const exposesRef = runtime.useRef<Record<string, unknown>>({});

      const propsRef = runtime.useRef<ReactAdapterProps<Props>>(props);
      propsRef.current = props;

      const subsRef = runtime.useRef<Set<() => void>>(new Set());
      const rawPropsSourceRef = runtime.useRef<RawPropsSource<Props> | null>(null);

      const pendingCommitRef = runtime.useRef(false);
      const pendingSignalRef = runtime.useRef<CommitSignal | null>(null);

      if (!rawPropsSourceRef.current) {
        rawPropsSourceRef.current = {
          debugName: `${proto.name}#raw-props`,
          get() {
            const base = propsRef.current;
            const p = getProps(base) ?? ({} as Partial<Props>);
            return p as unknown as Readonly<Props & PropsBaseType>;
          },
          subscribe(cb) {
            subsRef.current.add(cb);
            return () => subsRef.current.delete(cb);
          },
        };
      }

      runtime.useImperativeHandle(
        ref,
        () => ({
          update: () => controllerRef.current?.update(),
          getExposes: () => ({ ...(exposesRef.current ?? {}) }),
        }),
        []
      );

      runtime.useEffect(() => {
        for (const cb of subsRef.current) cb();
        if (autoUpdate) controllerRef.current?.update();
      }, [props, autoUpdate]);

      runtime.useLayoutEffect(() => {
        const rootEl = rootRef.current;
        if (!rootEl) return;
        if (controllerRef.current) return;

        (rootEl as any)[__REACT_PROTO_INSTANCE] = true;
        PROTO_BY_INSTANCE.set(rootEl, proto as Prototype<any>);

        const eventGate = createEventGate();
        eventGateRef.current = eventGate;

        const router = createWebProtoEventRouter({
          rootEl,
          globalEl: typeof window === 'undefined' ? rootEl : window,
          isEnabled: () => eventGate.isEnabled?.() ?? true,
        });
        routerRef.current = router;

        const effectsPort: EffectsPort = createReactEffectsPort(setHostTokens);
        const rawPropsSource = rawPropsSourceRef.current as RawPropsSource<Props>;

        const modules = createCapsWiring()
          .useProps(rawPropsSource)
          .useFeedback(effectsPort)
          .useEventTargets({
            root: () => router.rootTarget,
            global: () => router.globalTarget,
          })
          .useExposeState((record) => {
            exposesRef.current = record ?? {};
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

        const hostSession = createAdapterHost(
          proto,
          {
            getRawProps: () => rawPropsSource.get() as Readonly<Props & PropsBaseType>,
            schedule,
            commit: (children, signal) => {
              eventGate.disable();
              pendingCommitRef.current = true;
              pendingSignalRef.current = signal ?? null;
              setRenderChildren(children);
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

              controllerRef.current = null;
              exposesRef.current = {};
            },
          }
        );

        controllerRef.current = hostSession.controller as RuntimeController;

        return () => {
          hostSession.dispose();
        };
      }, []);

      runtime.useLayoutEffect(() => {
        if (!pendingCommitRef.current) return;
        pendingCommitRef.current = false;

        eventGateRef.current?.enable();
        pendingSignalRef.current?.done?.();
        pendingSignalRef.current = null;
      }, [renderChildren]);

      const hostClassName = [props.hostClassName, hostTokens.join(' ')]
        .map((x) => (x ?? '').trim())
        .filter((x) => x.length > 0)
        .join(' ');

      const rendered = renderTemplateToReact(runtime, renderChildren, {
        slot: props.children,
      });

      return runtime.createElement(
        rootTag,
        {
          ref: rootRef as any,
          className: hostClassName || undefined,
          style: props.hostStyle,
        },
        rendered
      );
    });

    Component.displayName = `Proto(${proto.name})`;

    return Component;
  };
}
