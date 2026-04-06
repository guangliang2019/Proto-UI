import type { Prototype } from '@proto.ui/core';
import type { CommitSignal, RuntimeController } from '@proto.ui/runtime';
import {
  createHostWiring,
  createEventGate,
  createWebProtoEventRouter,
  createSoftUnmountScheduler,
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
      const [shouldExist, setShouldExist] = runtime.useState(true);

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
      const commitVersionRef = runtime.useRef(0);
      const [commitVersion, setCommitVersion] = runtime.useState(0);
      const hostSessionRef = runtime.useRef<{ dispose(): void } | null>(null);
      const hasBeenUnmountedRef = runtime.useRef(false);
      const baselineOuterRafRef = runtime.useRef<number | null>(null);
      const baselineInnerRafRef = runtime.useRef<number | null>(null);
      const baselineSignalRef = runtime.useRef<CommitSignal | null>(null);

      const softUnmount = createSoftUnmountScheduler(
        () => rootRef.current,
        () => setShouldExist(false)
      );

      const cancelBaselineFrames = () => {
        if (baselineOuterRafRef.current != null) {
          cancelAnimationFrame(baselineOuterRafRef.current);
          baselineOuterRafRef.current = null;
        }
        if (baselineInnerRafRef.current != null) {
          cancelAnimationFrame(baselineInnerRafRef.current);
          baselineInnerRafRef.current = null;
        }
      };

      const resolveBaselineSignal = () => {
        baselineSignalRef.current?.done?.();
        baselineSignalRef.current = null;
      };

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
        if (!shouldExist) {
          // Soft unmount: presence requested unmount, but adapter component remains in tree.
          // Disable events and clear visual host tokens, but keep exposes so imperative
          // methods (e.g. controls.enter) can still re-enter from closed/absent.
          softUnmount.cancel();
          cancelBaselineFrames();
          resolveBaselineSignal();
          hasBeenUnmountedRef.current = true;
          eventGateRef.current?.disable?.();
          setHostTokens([]);
          return;
        }

        const rootEl = rootRef.current;
        if (!rootEl) return;

        // If there is an existing session, dispose it before creating a new one.
        // React rendered null while shouldExist was false, so the old DOM element was
        // removed. A new rootEl is fresh and the old router/modules are stale.
        if (hostSessionRef.current) {
          hostSessionRef.current.dispose();
          hostSessionRef.current = null;
          controllerRef.current = null;
          eventGateRef.current = null;
        }

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

        const presenceBridge = {
          mount() {
            softUnmount.cancel();
            setShouldExist(true);
          },
          unmount() {
            return softUnmount.schedule();
          },
        };

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
          presenceBridge,
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
            // React may bail out when children keeps the same reference.
            // Use an explicit commit version so baseline/layout settlement still runs.
            commitVersionRef.current += 1;
            setCommitVersion(commitVersionRef.current);
          },
          onAfterUnmount: () => {
            controllerRef.current = null;
            exposesRef.current = {};
            setHostTokens([]);
          },
        });

        hostSessionRef.current = hostSession;
        controllerRef.current = hostSession.controller as RuntimeController;
        invokeInCallbackScopeRef.current = hostSession.invokeInCallbackScope;
      }, [shouldExist]);

      // Hard unmount: when the React adapter component itself is removed from the parent tree,
      // unconditionally dispose any remaining session so the prototype runtime is torn down.
      runtime.useLayoutEffect(() => {
        return () => {
          softUnmount.cancel();
          cancelBaselineFrames();
          resolveBaselineSignal();
          if (hostSessionRef.current) {
            hostSessionRef.current.dispose();
            hostSessionRef.current = null;
            controllerRef.current = null;
          }
        };
      }, []);

      runtime.useLayoutEffect(() => {
        if (!pendingCommitRef.current) return;
        pendingCommitRef.current = false;

        const rootEl = rootRef.current;
        const needsBaseline =
          rootEl && !eventGateRef.current?.isEnabled?.() && hasBeenUnmountedRef.current;

        if (needsBaseline) {
          // 为跨帧 CSS transition 做准备：真实卸载后的 remount 需要先以 closed 状态渲染一帧
          cancelBaselineFrames();
          resolveBaselineSignal();

          rootEl!.setAttribute('data-transition-state', 'closed');
          void rootEl!.offsetHeight;
          eventGateRef.current?.enable();

          const signal = pendingSignalRef.current;
          pendingSignalRef.current = null;

          baselineSignalRef.current = signal;

          // 关键：使用双 RAF，确保 closed baseline 至少经历一帧可见提交。
          baselineOuterRafRef.current = requestAnimationFrame(() => {
            baselineOuterRafRef.current = null;
            baselineInnerRafRef.current = requestAnimationFrame(() => {
              baselineInnerRafRef.current = null;
              hasBeenUnmountedRef.current = false;

              const latestRoot = rootRef.current;
              const realState = (
                exposesRef.current as { transitionState?: { get?(): string } } | undefined
              )?.transitionState?.get?.();
              if (latestRoot) {
                if (typeof realState === 'string') {
                  latestRoot.setAttribute('data-transition-state', realState);
                } else {
                  latestRoot.removeAttribute('data-transition-state');
                }
              }

              resolveBaselineSignal();
            });
          });
          return;
        }

        // Baseline is already running (double RAF not settled yet).
        // Keep forcing closed state and do not cancel queued baseline frames,
        // otherwise React follow-up commits can collapse closed -> entering.
        if (
          hasBeenUnmountedRef.current &&
          (baselineSignalRef.current != null ||
            baselineOuterRafRef.current != null ||
            baselineInnerRafRef.current != null)
        ) {
          rootEl?.setAttribute('data-transition-state', 'closed');
          eventGateRef.current?.enable();
          pendingSignalRef.current?.done?.();
          pendingSignalRef.current = null;
          return;
        }

        cancelBaselineFrames();
        resolveBaselineSignal();
        eventGateRef.current?.enable();
        pendingSignalRef.current?.done?.();
        pendingSignalRef.current = null;
      }, [commitVersion]);

      const rendered = renderTemplateToReact(runtime, renderChildren, {
        slot: props.children,
      });

      if (!shouldExist) return null;
      return runtime.createElement(
        rootTag,
        {
          ref: rootRef as { current: HTMLElement | null },
          className: mergeHostClassName(props.hostClassName, hostTokens),
          style: props.hostStyle,
          'data-demo-ref': props['data-demo-ref' as keyof typeof props] as string | undefined,
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
