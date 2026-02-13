// packages/runtime/src/instance/execute/callback-scope.ts
import type { PropsBaseType } from '@proto-ui/types';
import type { RunHandle } from '@proto-ui/core';
import type { ExecPhase } from '@proto-ui/modules.base';
import type { ModuleOrchestrator } from '../../orchestrator/module-orchestrator';
import type { PropsPort, PropsWatchTask } from '@proto-ui/modules.props';

/**
 * Centralize callback-phase semantics:
 * - set exec phase to "callback"
 * - set/clear opaque callback ctx for SYS_CAP.getCallbackCtx()
 * - sync props from host (if available)
 * - dispatch props watch tasks
 *
 * This object intentionally does NOT know DefHandle / LifecycleRegistry.
 * It only manages callback context and pre-callback plumbing.
 */
export class CallbackScope<P extends PropsBaseType> {
  constructor(
    private readonly setPhase: (p: ExecPhase) => void,
    private readonly moduleHub: ModuleOrchestrator
  ) {}

  private syncPropsFromHost() {
    const propsPort = this.moduleHub.getPort<PropsPort<P>>('props');
    propsPort?.syncFromHost?.();
  }

  private dispatchPropsTasks(ctx: RunHandle<P>) {
    const propsPort = this.moduleHub.getPort<PropsPort<P>>('props');
    const tasks = propsPort?.consumeTasks?.() ?? [];
    for (const t of tasks as PropsWatchTask<P>[]) {
      // ctx is run; module-props does not know what ctx is.
      t.cb(ctx as any, t.next as any, t.prev as any, t.info as any);
    }
  }

  /**
   * Run a callback block in "callback" phase with ctx set.
   * This guarantees cleanup even if callback throws.
   */
  run<T>(ctx: RunHandle<P>, fn: () => T): T {
    this.setPhase('callback');

    // Provide callback ctx for modules via SYS_CAP.getCallbackCtx()
    (this.moduleHub as any).__setCallbackCtx?.(ctx);

    try {
      this.syncPropsFromHost();
      this.dispatchPropsTasks(ctx);
      return fn();
    } finally {
      // clear ctx to avoid accidental leakage
      (this.moduleHub as any).__setCallbackCtx?.(undefined);
      this.setPhase('unknown');
    }
  }

  /**
   * A light variant: do NOT sync from host.
   * Useful for applyRawProps-style flows where props were already applied
   * and we only want to dispatch watch tasks.
   */
  runNoSync<T>(ctx: RunHandle<P>, fn: () => T): T {
    this.setPhase('callback');
    (this.moduleHub as any).__setCallbackCtx?.(ctx);

    try {
      this.dispatchPropsTasks(ctx);
      return fn();
    } finally {
      (this.moduleHub as any).__setCallbackCtx?.(undefined);
      this.setPhase('unknown');
    }
  }

  /**
   * Expose primitives when orchestrator needs finer control.
   */
  syncAndDispatch(ctx: RunHandle<P>) {
    this.syncPropsFromHost();
    this.dispatchPropsTasks(ctx);
  }
}
