// packages/core/src/module/types.ts
export type ModuleScope = 'instance' | 'host' | 'singleton';

export type ProtoPhase = 'setup' | 'mounted' | 'updated' | 'unmounted';

export type ModuleInit = {
  prototypeName: string;
  debugLabel?: string;
};

export interface ModuleFacade {
  // intentionally empty; modules define their own facade types
}

export interface ModulePort {
  // intentionally empty; modules define their own port types
}

export interface ModuleInstance<F extends ModuleFacade> {
  readonly name: string;
  readonly scope: ModuleScope;
  readonly facade: F;
  readonly hooks: ModuleHooks;
}

export interface ModuleHooks {
  onProtoPhase?(phase: ProtoPhase): void;
  afterRenderCommit?(): void;
  dispose?(): void;
}
