// packages/runtime/src/kernel/kernel.ts
import {
  createRendererPrimitives,
  Phase,
  Prototype,
  RendererHandle,
  RenderFn,
  RenderReadHandle,
  RunHandle,
  TemplateChildren,
  __AS_HOOK_CURRENT_DEF,
  __AS_HOOK_PRIV_FACADES,
} from '@proto-ui/core';
import { PropsBaseType } from '@proto-ui/types';
import {
  createDefHandle,
  createLifecycleRegistry,
  createRunHandle,
  LifecycleRegistry,
  type EventCallbacksSink,
} from './handles';
import type { RuleFacade } from '@proto-ui/modules.rule';
import type { ModuleOrchestratorFacadeView } from '../orchestrator/module-orchestrator/types';
import type { PropsFacade } from '@proto-ui/modules.props';
import type { ExecPhase } from '@proto-ui/modules.base';
import type { RuntimeTimeline } from './timeline';
import { attachAsHookRuntime } from './as-hook';

export type Kernel<P extends PropsBaseType> = {
  getPhase(): Phase;
  setPhase(p: Phase): void;

  lifecycle: LifecycleRegistry<P>;
  rules: RuleFacade<P>;

  run: RunHandle<P>;
  read: RenderReadHandle<P>;
  renderer: RendererHandle<P>;
  renderFn: RenderFn;

  renderOnce(): TemplateChildren;

  setTimeline(t: RuntimeTimeline | null): void;
};

export type CreateKernelOptions = {
  allowRunUpdate?: boolean;
  onPhaseChange?: (p: ExecPhase) => void;
  asHook?: { projectState?: <T>(state: T) => T };
};

export function createKernel<P extends PropsBaseType>(
  proto: Prototype<P>,
  modules: ModuleOrchestratorFacadeView,
  opt?: CreateKernelOptions & { eventSink?: EventCallbacksSink<P> }
): Kernel<P> {
  let phase: ExecPhase = 'unknown';
  let timeline: RuntimeTimeline | null = null;

  const setPhase = (p: ExecPhase) => {
    phase = p;
    opt?.onPhaseChange?.(p);
  };

  const st = {
    prototypeName: proto.name,
    getPhase: () => phase,
  };

  const lifecycle = createLifecycleRegistry<P>();
  const rules = modules.getFacades()['rule'] as RuleFacade<P>;

  const def = createDefHandle<P>(st, lifecycle, rules, modules, opt?.eventSink);
  attachAsHookRuntime(def, st, proto, opt?.asHook);
  Object.defineProperty(def as any, __AS_HOOK_PRIV_FACADES, {
    value: modules.getFacades(),
    enumerable: false,
    configurable: false,
    writable: false,
  });

  // ----------------
  // setup
  // ----------------
  setPhase('setup');
  (globalThis as any)[__AS_HOOK_CURRENT_DEF] = def;
  let maybeRender: RenderFn | void;
  try {
    maybeRender = proto.setup(def);
  } finally {
    (globalThis as any)[__AS_HOOK_CURRENT_DEF] = undefined;
  }
  const renderFn: RenderFn = maybeRender ?? ((renderer) => [renderer.r.slot()]);
  setPhase('unknown');

  // ----------------
  // run handle
  // ----------------
  let runUpdateImpl: (() => void) | undefined = undefined;
  if (opt?.allowRunUpdate) {
    runUpdateImpl = () => {
      throw new Error(`[Runtime] run.update() is not wired yet.`);
    };
  }

  // NOTE: createRunHandle only depends on the facade view.
  const run = createRunHandle<P>(() => {
    if (!runUpdateImpl) {
      throw new Error(`[Runtime] run.update() is not supported in host-free execution.`);
    }
    runUpdateImpl();
  }, modules);

  // ----------------
  // read / renderer
  // ----------------
  const facades = modules.getFacades();
  const propsFacade = facades['props'] as PropsFacade<P>;

  const read: RenderReadHandle<P> = {
    props: propsFacade as any,
  };

  const { el, r } = createRendererPrimitives();
  const renderer: RendererHandle<P> = { el, r, read };

  // ----------------
  // render
  // ----------------
  const renderOnce = () => {
    setPhase('render');
    const children = renderFn(renderer);
    setPhase('unknown');

    timeline?.mark('tree:logical-ready');
    return children;
  };

  return {
    getPhase: () => phase,
    setPhase: (p) => setPhase(p as any),

    lifecycle,
    rules,

    run,
    read,
    renderer,
    renderFn,

    renderOnce,

    setTimeline: (t) => {
      timeline = t;
    },
  };
}
