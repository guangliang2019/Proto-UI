// packages/runtime/src/kernel/handles/def.ts
import {
  __AS_HOOK_RUNTIME,
  type AsHookRuntime,
  type DefHandle,
  type RunHandle,
  type StyleHandle,
} from '@proto-ui/core';
import { illegalPhase } from '../guard';
import type { RuleSpec, RuleFacade } from '@proto-ui/modules.rule';
import type { ExposeEventSpec, PropsBaseType } from '@proto-ui/types';
import type { ModuleOrchestratorFacadeView } from '../../orchestrator/module-orchestrator/types';
import type { FeedbackFacade } from '@proto-ui/modules.feedback';
import type { PropsFacade } from '@proto-ui/modules.props';
import type { EventFacade } from '@proto-ui/modules.event';
import type { StateFacade } from '@proto-ui/modules.state';
import type { ContextFacade } from '@proto-ui/modules.context';
import type { ExposeFacade } from '@proto-ui/modules.expose';
import { RuntimeEventCallbacks } from '../event';

export type LifecycleKind = 'created' | 'mounted' | 'updated' | 'unmounted';

export interface LifecycleRegistry<P extends PropsBaseType> {
  created: Array<(run: RunHandle<P>) => void>;
  mounted: Array<(run: RunHandle<P>) => void>;
  updated: Array<(run: RunHandle<P>) => void>;
  unmounted: Array<(run: RunHandle<P>) => void>;
}

export interface DefRuntimeState {
  getPhase(): 'setup' | 'render' | 'callback' | 'unknown';
  prototypeName: string;
}

export interface EventCallbacksSink<P extends PropsBaseType> {
  setEventCallbacks(callbacks: RuntimeEventCallbacks<P>): void;
}

export function createLifecycleRegistry<P extends PropsBaseType>(): LifecycleRegistry<P> {
  return { created: [], mounted: [], updated: [], unmounted: [] };
}

export const createDefHandle = <P extends PropsBaseType, E = Record<string, unknown>>(
  st: DefRuntimeState,
  life: LifecycleRegistry<P>,
  rules: RuleFacade<P>,
  modules: ModuleOrchestratorFacadeView,
  eventSink?: EventCallbacksSink<P>
): DefHandle<P, E> => {
  const recordCaptured = (
    def: DefHandle<P, E>,
    kind: 'props' | 'state' | 'context' | 'event' | 'feedback',
    entry: unknown
  ) => {
    const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
    rt?.recordCaptured(kind, entry);
  };

  const facades = modules.getFacades();
  const feedback = facades['feedback'] as FeedbackFacade;
  const props = facades['props'] as PropsFacade<P>;

  const state = facades['state'] as StateFacade;
  const context = facades['context'] as ContextFacade;
  const expose = facades['expose'] as ExposeFacade;

  const eventFacade = facades['event'] as EventFacade;
  const eventCallbacks = new RuntimeEventCallbacks<P>();
  eventSink?.setEventCallbacks(eventCallbacks);

  const ensureSetup = (op: string) => {
    const phase = st.getPhase();
    if (phase !== 'setup') {
      illegalPhase(op, st.prototypeName, phase, `Use 'run' inside runtime callbacks, not 'def'.`);
    }
  };

  const def: DefHandle<P, E> = {
    lifecycle: {
      onCreated(cb) {
        ensureSetup(`def.lifecycle.onCreated`);
        life.created.push(cb);
      },
      onMounted(cb) {
        ensureSetup(`def.lifecycle.onMounted`);
        life.mounted.push(cb);
      },
      onUpdated(cb) {
        ensureSetup(`def.lifecycle.onUpdated`);
        life.updated.push(cb);
      },
      onUnmounted(cb) {
        ensureSetup(`def.lifecycle.onUnmounted`);
        life.unmounted.push(cb);
      },
    },

    props: {
      define(specMap) {
        ensureSetup(`def.props.define`);
        props.define(specMap);
        recordCaptured(def, 'props', { op: 'define', specMap });
      },
      setDefaults(partial) {
        ensureSetup(`def.props.setDefaults`);
        props.setDefaults(partial);
        recordCaptured(def, 'props', { op: 'setDefaults', partial });
      },

      // Wrap user callback so module-props does NOT depend on RunHandle type.
      watch(keys, cb) {
        ensureSetup(`def.props.watch`);
        props.watch(keys as any, (ctx, next, prev, info) =>
          (cb as any)(ctx as RunHandle<P>, next, prev, info)
        );
        recordCaptured(def, 'props', { op: 'watch', keys: [...keys] });
      },
      watchAll(cb) {
        ensureSetup(`def.props.watchAll`);
        props.watchAll((ctx, next, prev, info) =>
          (cb as any)(ctx as RunHandle<P>, next, prev, info)
        );
        recordCaptured(def, 'props', { op: 'watchAll' });
      },
      watchRaw(keys, cb) {
        ensureSetup(`def.props.watchRaw`);
        props.watchRaw(keys as any, (ctx, next, prev, info) =>
          (cb as any)(ctx as RunHandle<P>, next, prev, info)
        );
        recordCaptured(def, 'props', { op: 'watchRaw', keys: [...keys] });
      },
      watchRawAll(cb) {
        ensureSetup(`def.props.watchRawAll`);
        props.watchRawAll((ctx, next, prev, info) =>
          (cb as any)(ctx as RunHandle<P>, next, prev, info)
        );
        recordCaptured(def, 'props', { op: 'watchRawAll' });
      },
    },

    feedback: {
      style: {
        use: (...handles: StyleHandle[]) => {
          ensureSetup(`def.feedback.style.use`);
          const unUse = feedback.style.use(...handles);
          recordCaptured(def, 'feedback', unUse);
          return () => {
            ensureSetup(`def.feedback.style.use:unUse`);
            unUse();
          };
        },
      },
    },

    expose: (() => {
      const fn = (key: any, value: any) => {
        ensureSetup('def.expose');
        expose.expose(key as any, value as any);
        recordCaptured(def, 'context', { op: 'expose', key, value });
      };

      fn.event = (key: string, spec?: ExposeEventSpec) => {
        ensureSetup('def.expose.event');
        eventFacade.registerExposeEvent(key, spec);
        expose.expose(key, { __pui_expose: 'event', spec } as any);
        recordCaptured(def, 'event', { op: 'expose.event', key, spec });
      };

      fn.state = (key: string, handle: any) => {
        ensureSetup('def.expose.state');
        expose.expose(key, handle);
        recordCaptured(def, 'state', handle);
      };

      fn.value = (key: string, value: any) => {
        ensureSetup('def.expose.value');
        expose.expose(key, value);
        recordCaptured(def, 'context', { op: 'expose.value', key, value });
      };

      fn.method = (key: string, fnValue: any) => {
        ensureSetup('def.expose.method');
        expose.expose(key, fnValue);
        recordCaptured(def, 'context', { op: 'expose.method', key, fn: fnValue });
      };

      return fn;
    })(),

    rule: (spec: RuleSpec<any>) => {
      ensureSetup('def.rule');
      rules.rule(spec as any);
    },

    event: {
      on: (type, cb, options) => {
        ensureSetup(`def.event.on`);
        const token = eventFacade.on(type, options);
        eventCallbacks.register((token as any).id, cb);
        recordCaptured(def, 'event', token);
        return token;
      },

      onGlobal: (type, cb, options) => {
        ensureSetup(`def.event.onGlobal`);
        const token = eventFacade.onGlobal(type, options);
        eventCallbacks.register((token as any).id, cb);
        recordCaptured(def, 'event', token);
        return token;
      },

      off: (token) => {
        ensureSetup(`def.event.off`);
        const id = (token as any)?.id;
        if (typeof id === 'string' && id) {
          eventCallbacks.remove(id);
        }
        eventFacade.off(token);
        recordCaptured(def, 'event', { op: 'off', token });
      },
    },

    state: {
      bool(semantic, defaultValue) {
        ensureSetup('def.state.bool');
        const handle = state.bool(semantic, defaultValue);
        recordCaptured(def, 'state', handle);
        return handle;
      },
      enum(semantic, defaultValue, spec) {
        ensureSetup('def.state.enum');
        const handle = state.enum(semantic, defaultValue, spec);
        recordCaptured(def, 'state', handle);
        return handle;
      },
      string(semantic, defaultValue, spec) {
        ensureSetup('def.state.string');
        const handle = state.string(semantic, defaultValue, spec);
        recordCaptured(def, 'state', handle);
        return handle;
      },
      numberRange(semantic, defaultValue, spec) {
        ensureSetup('def.state.numberRange');
        const handle = state.numberRange(semantic, defaultValue, spec);
        recordCaptured(def, 'state', handle);
        return handle;
      },
      numberDiscrete(semantic, defaultValue, spec) {
        ensureSetup('def.state.numberDiscrete');
        const handle = state.numberDiscrete(semantic, defaultValue, spec);
        recordCaptured(def, 'state', handle);
        return handle;
      },
    },

    context: {
      provide(key, defaultValue) {
        ensureSetup('def.context.provide');
        const update = context.provide(key, defaultValue);
        recordCaptured(def, 'context', update);
        return update;
      },
      subscribe(key, cb) {
        ensureSetup('def.context.subscribe');
        if (!cb) {
          context.subscribe(key);
          recordCaptured(def, 'context', { op: 'subscribe', key });
          return;
        }
        context.subscribe(key, (ctx, next, prev) => cb(ctx as RunHandle<P>, next, prev));
        recordCaptured(def, 'context', { op: 'subscribe', key, hasCallback: true });
      },
      trySubscribe(key, cb) {
        ensureSetup('def.context.trySubscribe');
        if (!cb) {
          context.trySubscribe(key);
          recordCaptured(def, 'context', { op: 'trySubscribe', key });
          return;
        }
        context.trySubscribe(key, (ctx, next, prev) => cb(ctx as RunHandle<P>, next, prev));
        recordCaptured(def, 'context', { op: 'trySubscribe', key, hasCallback: true });
      },
    },
  };

  return def;
};
