// packages/runtime/src/instance/instance.ts
import type { Prototype, RunHandle, TemplateChildren } from '@proto-ui/core';
import type { PropsBaseType } from '@proto-ui/types';

import { FeedbackModuleDef } from '@proto-ui/modules.feedback';
import { PropsModuleDef } from '@proto-ui/modules.props';
import { EventModuleDef } from '@proto-ui/modules.event';
import { ExposeModuleDef } from '@proto-ui/modules.expose';
import { ExposeStateModuleDef } from '@proto-ui/modules.expose-state';
import { ExposeStateWebModuleDef } from '@proto-ui/modules.expose-state-web';
import { RuleExposeStateWebModuleDef } from '@proto-ui/modules.rule-expose-state-web';
import { RuleModuleDef } from '@proto-ui/modules.rule';
import { StateModuleDef } from '@proto-ui/modules.state';
import { ContextModuleDef } from '@proto-ui/modules.context';
import { AsTriggerModuleDef } from '@proto-ui/modules.as-trigger';
import { __RUN_TEST_SYS, TestSysModuleDef, type TestSysPort } from '@proto-ui/modules.test-sys';

import type { ModuleOrchestrator } from '../orchestrator/module-orchestrator';
import { RuntimeModuleOrchestrator } from '../orchestrator/module-orchestrator';
import type { ExecPhase } from '@proto-ui/modules.base';
import { __RT_EVENT_CALLBACKS } from '../kernel/event';

import { CallbackScope } from './execute/callback-scope';
import { createKernel, type Kernel } from '../kernel';
import { createAsHookStateProjector } from '../kernel/as-hook';
import type { RuntimeTimeline } from '../kernel/timeline';

export type RuntimeInstance<P extends PropsBaseType> = {
  kernel: Kernel<P>;
  moduleHub: ModuleOrchestrator;
  callbackScope: CallbackScope<P>;

  renderOnce(): TemplateChildren;

  /**
   * Run lifecycle callbacks in callback phase (sync props + dispatch watches + ctx).
   * This is the only correct entrance for lifecycle callbacks.
   */
  runLifecycle(kind: keyof Kernel<P>['lifecycle']): void;

  setTimeline(t: RuntimeTimeline | null): void;
  dispose(): void;
};

export function createRuntimeInstance<P extends PropsBaseType>(
  proto: Prototype<P>,
  opt?: {
    allowRunUpdate?: boolean;
    onModulesReady?: (hub: ModuleOrchestrator) => void;
  }
): RuntimeInstance<P> {
  // stable phase ref for SYS_CAP.execPhase() during module setup/runtime checks
  let phaseRef: ExecPhase = 'unknown';
  const getPhase = () => phaseRef;

  const moduleHub = new RuntimeModuleOrchestrator({ prototypeName: proto.name, getPhase }, [
    AsTriggerModuleDef,
    RuleModuleDef,
    FeedbackModuleDef,
    PropsModuleDef,
    EventModuleDef,
    ExposeModuleDef,
    ExposeStateModuleDef,
    ExposeStateWebModuleDef,
    RuleExposeStateWebModuleDef,
    StateModuleDef,
    ContextModuleDef,
    TestSysModuleDef,
  ]);

  opt?.onModulesReady?.(moduleHub);

  const kernel = createKernel<P>(proto, moduleHub, {
    allowRunUpdate: opt?.allowRunUpdate,
    onPhaseChange: (p) => {
      phaseRef = p;
    },
    asHook: {
      projectState: createAsHookStateProjector<P>(moduleHub.getPort('state')),
    },
    eventSink: {
      setEventCallbacks: (callbacks) => {
        (moduleHub as any)[__RT_EVENT_CALLBACKS] = callbacks;
      },
    },
  });

  // align once (after setup ends kernel is typically "unknown")
  phaseRef = kernel.getPhase() as any;

  const callbackScope = new CallbackScope<P>((p) => kernel.setPhase(p as any), moduleHub);

  // add test-sys to run handle, for contract tests
  const testSys = moduleHub.getPort<TestSysPort>('test-sys');
  if (testSys) {
    Object.defineProperty(kernel.run as any, __RUN_TEST_SYS, {
      value: testSys,
      enumerable: false,
      configurable: false,
      writable: false,
    });
  }

  const renderOnce = () => kernel.renderOnce();

  const runLifecycle = (kind: keyof Kernel<P>['lifecycle']) => {
    callbackScope.run(kernel.run, () => {
      for (const cb of kernel.lifecycle[kind] as Array<(run: RunHandle<P>) => void>) {
        cb(kernel.run);
      }
    });
  };

  const setTimeline = (t: RuntimeTimeline | null) => {
    kernel.setTimeline(t);
  };

  const dispose = () => {
    moduleHub.dispose();
  };

  return {
    kernel,
    moduleHub,
    callbackScope,
    renderOnce,
    runLifecycle,
    setTimeline,
    dispose,
  };
}
