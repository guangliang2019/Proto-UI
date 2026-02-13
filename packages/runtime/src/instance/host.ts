// packages/runtime/src/instance/host.ts
import type { TemplateChildren } from '@proto-ui/core';
import type { PropsBaseType } from '@proto-ui/types';
import type { ModuleWiring } from '../orchestrator/module-orchestrator';

export type CommitSignal = {
  done(): void;
};

export interface RuntimeHost<P extends PropsBaseType> {
  /** For diagnostics / errors */
  readonly prototypeName: string;

  /** Commit HostRoot children to the host platform */
  commit(children: TemplateChildren, signal?: CommitSignal): void;

  /** Scheduling hook (for microtask/macrotask decisions, adapter controls timing) */
  schedule(task: () => void): void;

  /** host must provide raw props snapshot (may include undeclared keys) */
  getRawProps(): Readonly<P & PropsBaseType>;

  /**
   * CP1 hook: called after runtime binds to the host and initial raw props hydration is done,
   * but BEFORE `created` callbacks and BEFORE the first commit.
   *
   * Intended for adapter wiring (caps injection), e.g.:
   * - rawPropsSource
   * - effects ports
   * - platform refs
   */
  onRuntimeReady?(wiring: ModuleWiring): void;

  /**
   * CP8 hook: called when unmount begins, BEFORE `unmounted` callbacks run.
   *
   * Intended for making event systems ineffective, stopping observers, etc.
   * This must NOT dispose moduleHub.
   */
  onUnmountBegin?(): void;
}
