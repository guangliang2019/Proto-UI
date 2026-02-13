import type { StyleHandle, ModuleInstance } from '@proto-ui/core';
import type { ModuleFacade, ModuleHooks, ModuleScope } from '@proto-ui/core';

export interface FeedbackFacade extends ModuleFacade {
  style: {
    /** setup-only */
    use: (...handles: StyleHandle[]) => () => void;

    /** pure snapshot: allowed in any phase */
    exportMerged: () => StyleHandle;
  };
}

export type FeedbackPort = {
  /**
   * Runtime-only: apply merged style tokens directly.
   * Intended for rule execution or adapter-driven updates.
   */
  applyMergedStyle(handle: StyleHandle): void;

  /**
   * Runtime-only: record a style use (returns unUse).
   * Preserves ordering semantics (later use wins by position).
   */
  useStyleRuntime: (...handles: StyleHandle[]) => () => void;

  /**
   * Internal: record style tokens without v0 token validation.
   * Intended for rule extensions that emit selector-based tokens.
   */
  useStyleUnsafe: (...handles: StyleHandle[]) => () => void;
};

/**
 * Optional internal hooks (runtime-facing).
 * If你不想暴露这些，就把它们留在实现文件里，不导出也行。
 */
export interface FeedbackInternalHooks extends ModuleHooks {
  /** called by runtime or host to try applying effects */
  flushIfPossible(): void;

  /** optional hook: structural commit replaced DOM */
  afterRenderCommit(): void;

  /** optional: runtime/adapter can call this after flush tick */
  onEffectsFlushed?(): void;
}

export type FeedbackModule = ModuleInstance<FeedbackFacade> & {
  name: 'feedback';
  scope: ModuleScope; // normally "instance"
};
