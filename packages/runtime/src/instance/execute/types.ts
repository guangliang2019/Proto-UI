// packages/runtime/src/instance/execute/types.ts
import { TemplateChildren } from "@proto-ui/core";
import { PropsBaseType } from "@proto-ui/types";
import { LifecycleRegistry } from "../../kernel/handles/def";
import { ModuleOrchestrator } from "../../orchestrator/module-orchestrator";

export interface ExecuteOptions {
  props?: any;
}

export interface ExecuteResult<P extends PropsBaseType> {
  children: TemplateChildren;
  lifecycle: LifecycleRegistry<P>;
  invoke(kind: keyof LifecycleRegistry<P>): void;
}

export interface RuntimeController {
  applyRawProps(nextRaw: Record<string, any>): void;

  update(): void; // render + commit (host only)

  /** v0: evaluate rule -> style tokens (props only for now) */
  getRuleStyleTokens(): string[];
}

/**
 * Host-based executor (used by adapters).
 */
export interface ExecuteWithHostResult {
  children: TemplateChildren;
  controller: RuntimeController;
  invokeUnmounted(): void;

  /** expose module host for adapter caps injection (temporary but effective) */
  caps: ModuleOrchestrator;
}
