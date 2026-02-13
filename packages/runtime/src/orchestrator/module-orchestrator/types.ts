// packages/runtime/src/orchestrator/module-orchestrator/types.ts
import type {
  CapEntries,
  ModuleFacade,
  ModuleInstance,
  ModuleScope,
  ProtoPhase,
} from '@proto-ui/core';
import type { CapsController } from '../caps';

/**
 * A module instance in runtime.
 */
export type AnyModule = ModuleInstance<ModuleFacade> & {
  name: string;
  scope: ModuleScope;
};

/**
 * Facade-only view for places that must NOT touch ports.
 * Kernel should only depend on this.
 */
export interface ModuleOrchestratorFacadeView {
  /** runtime -> handles (facades are safe, stable, public) */
  getFacades(): Record<string, ModuleFacade>;
}

export interface ModuleOrchestrator extends ModuleOrchestratorFacadeView {
  /** runtime -> modules */
  setProtoPhase(phase: ProtoPhase): void;
  afterRenderCommit(): void;

  /** runtime -> ports (internal / privileged) */
  getPort<T>(moduleName: string): T | undefined;

  /** runtime -> adapter */
  getCapsController(moduleName: string): CapsController | undefined;

  /** adapter wiring API (flat) */
  getWiring(): ModuleWiring;

  /** lifecycle */
  dispose(): void;
}

export interface ModuleWiring {
  /**
   * Attach host caps for a module.
   * Returns true if attached, false if module not found.
   */
  attach(moduleName: string, entries: CapEntries): boolean;

  /**
   * Reset host caps for a module.
   * If moduleName is omitted, reset all attached host caps.
   */
  reset(moduleName?: string): void;
}
