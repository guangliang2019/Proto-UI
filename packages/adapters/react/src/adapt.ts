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
import { createReactEffectsPort } from './runtime/effects-port';
import { createReactModules } from './runtime/modules';
import { createReactHostSession } from './runtime/session';
import { renderTemplateToReact, type ReactRuntime as ReactRenderRuntime } from './template';

export { __REACT_PROTO_INSTANCE } from './platform/instance-tree';

export type ReactRuntime = ReactRenderRuntime & {
  useState: <T>(init: T) => [T, (next: T) => void];
  useRef: <T>(init: T) => { current: T };
  useEffect: (cb: () => void | (() => void), deps?: any[]) => void;
  useLayoutEffect: (cb: () => void | (() => void), deps?: any[]) => void;
  useImperativeHandle: (ref: any, create: () => any, deps?: any[]) => void;
  forwardRef: (render: (props: any, ref: any) => any) => any;
  createElement: (type: any, props?: any, ...children: any[]) => any;
};

export type ReactAdapterHandle = {
  update(): void;
  getExposes(): Record<string, unknown>;
  invokeInCallbackScope?(fn: () => void): void;
};

export type ReactAdapterProps<Props extends PropsBaseType> = Props &
  PropsBaseType & {
    children?: any;
    hostClassName?: string;
    hostStyle?: any;
    [key: `on${string}`]: unknown;
  };

export interface ReactAdapterOptions<Props extends PropsBaseType> {
  schedule?: (task: () => void) => void;
  getProps?: (props: ReactAdapterProps<Props>) => Partial<Props> | null | undefined;
  getMeta?: (key: string) => unknown;
  exposeStateWebMode?: ExposeStateWebMode;
  autoUpdateOnPropsChange?: boolean;
  rootTag?: string;
}

type ReactRuntimeInput = ReactRuntime | { React: ReactRuntime };

function defaultGetProps<Props extends PropsBaseType>(
  props: ReactAdapterProps<Props>
): Partial<Props> {
  const { children, hostClassName, hostStyle, ...rest } = (props ?? {}) as any;
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rest)) {
    if (isFrameworkEventProp(key, value)) continue;
    filtered[key] = value;
  }
  return filtered as Partial<Props>;
}

export function createReactAdapter(runtimeInput: ReactRuntimeInput) {
  const runtime = normalizeRuntime(runtimeInput);

  return function AdaptToReact<Props extends PropsBaseType>(
    proto: Prototype<Props>,
    opt: ReactAdapterOptions<Props> = {}
  ) {
    const schedule = opt.schedule ?? ((task) => queueMicrotask(task));
    const getProps = opt.getProps ?? defaultGetProps;
    const getMeta = opt.getMeta ?? createDefaultMetaGetter();
    const exposeStateWebMode = opt.exposeStateWebMode;
    const autoUpdate = opt.autoUpdateOnPropsChange ?? true;
    const rootTag = opt.rootTag ?? 'div';

    const Component = runtime.forwardRef((props: ReactAdapterProps<Props>, ref: any) => {
      const rootRef = runtime.useRef<HTMLElement | null>(null);
      const [renderChildren, setRenderChildren] = runtime.useState<any>(null);
      const [hostTokens, setHostTokens] = runtime.useState<string[]>([]);

      const controllerRef = runtime.useRef<RuntimeController | null>(null);
      const eventGateRef = runtime.useRef<ReturnType<typeof createEventGate> | null>(null);
      const exposesRef = runtime.useRef<Record<string, unknown>>({});
      const invokeInCallbackScopeRef = runtime.useRef<((fn: () => void) => void) | null>(null);

      const propsRef = runtime.useRef<ReactAdapterProps<Props>>(props);
      propsRef.current = props;
      const eventCallbacksRef = runtime.useRef<Record<string, (payload?: unknown) => void>>({});
      eventCallbacksRef.current = collectEventCallbacks(props);

      const subsRef = runtime.useRef<Set<() => void>>(new Set());
      const rawPropsSourceRef = runtime.useRef<RawPropsSource<Props> | null>(null);

      const pendingCommitRef = runtime.useRef(false);
      const pendingSignalRef = runtime.useRef<CommitSignal | null>(null);

      if (!rawPropsSourceRef.current) {
        rawPropsSourceRef.current = {
          debugName: `${proto.name}#raw-props`,
          get() {
            const nextProps = getProps(propsRef.current) ?? ({} as Partial<Props>);
            return nextProps as Readonly<Props & PropsBaseType>;
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
          invokeInCallbackScope: (fn: () => void) => invokeInCallbackScopeRef.current?.(fn),
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

        markProtoInstance(rootEl, proto as Prototype<any>);

        const eventGate = createEventGate();
        eventGateRef.current = eventGate;

        const router = createWebProtoEventRouter({
          rootEl,
          globalEl: typeof window === 'undefined' ? rootEl : window,
          isEnabled: () => eventGate.isEnabled?.() ?? true,
        });

        const effectsPort = createReactEffectsPort((tokens) => {
          setHostTokens(tokens);
        });

        const rawPropsSource = rawPropsSourceRef.current as RawPropsSource<Props>;
        const modules = createReactModules({
          el: rootEl,
          router,
          emit: (key, payload) => {
            eventCallbacksRef.current[key]?.(payload);
          },
          rawPropsSource,
          effectsPort,
          getMeta,
          exposeStateWebMode,
          setExposes: (record) => {
            exposesRef.current = record;
          },
        });

        const wiring = createHostWiring({ prototypeName: proto.name, modules });

        const hostSession = createReactHostSession({
          proto,
          schedule,
          rawPropsSource,
          wiring,
          eventGate,
          router,
          onCommit: (children, signal) => {
            pendingCommitRef.current = true;
            pendingSignalRef.current = signal;
            setRenderChildren(children);
          },
          onAfterUnmount: () => {
            controllerRef.current = null;
            exposesRef.current = {};
            setHostTokens([]);
          },
        });

        controllerRef.current = hostSession.controller as RuntimeController;
        invokeInCallbackScopeRef.current = hostSession.invokeInCallbackScope;

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

      const rendered = renderTemplateToReact(runtime, renderChildren, {
        slot: props.children,
      });

      return runtime.createElement(
        rootTag,
        {
          ref: rootRef as any,
          className: mergeHostClassName(props.hostClassName, hostTokens),
          style: props.hostStyle,
          'data-demo-ref': props['data-demo-ref' as keyof typeof props] as any,
        },
        rendered
      );
    });

    Component.displayName = `Proto(${proto.name})`;
    return Component;
  };
}

function normalizeRuntime(input: ReactRuntimeInput): ReactRuntime {
  return (input as any).React ?? (input as ReactRuntime);
}

function mergeHostClassName(input: unknown, hostTokens: string[]) {
  const values = [input, hostTokens.join(' ')]
    .map((value: any) => (typeof value === 'string' ? value.trim() : value))
    .filter((value: any) => {
      if (typeof value === 'string') return value.length > 0;
      return value != null;
    });

  const seen = new Set<string>();
  const out: string[] = [];

  for (const value of values) {
    if (typeof value !== 'string') continue;
    for (const token of value.split(/\s+/)) {
      if (!token || seen.has(token)) continue;
      seen.add(token);
      out.push(token);
    }
  }

  return out.length > 0 ? out.join(' ') : undefined;
}

function collectEventCallbacks(
  props: Record<string, unknown>
): Record<string, (payload?: unknown) => void> {
  const out: Record<string, (payload?: unknown) => void> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!isFrameworkEventProp(key, value)) continue;
    const eventKey = fromHandlerPropName(key);
    if (!eventKey) continue;
    out[eventKey] = value as (payload?: unknown) => void;
  }
  return out;
}

function isFrameworkEventProp(key: string, value: unknown) {
  return /^on[A-Z]/.test(key) && typeof value === 'function';
}

function fromHandlerPropName(key: string) {
  const raw = key.slice(2);
  if (!raw) return null;
  return raw[0]!.toLowerCase() + raw.slice(1);
}
