// packages/modules/base/src/create-module.ts
import type {
  ModuleFacade,
  ModuleHooks,
  ModuleInstance,
  ModuleInit,
  ModuleScope,
  CapsVaultView,
} from "@proto-ui/core";

export type ModuleDeps = {
  /**
   * Require a declared dependency's facade.
   * Throws if the dependency is undeclared or missing.
   */
  requireFacade<T extends ModuleFacade>(name: string): T;
  /**
   * Require a declared dependency's port.
   * Throws if the dependency is undeclared or missing.
   */
  requirePort<T>(name: string): T;
  /**
   * Try a declared dependency's facade.
   * Returns undefined if missing, but still throws if undeclared.
   */
  tryFacade<T extends ModuleFacade>(name: string): T | undefined;
  /**
   * Try a declared dependency's port.
   * Returns undefined if missing, but still throws if undeclared.
   */
  tryPort<T>(name: string): T | undefined;
};

export type ModuleFactoryArgs = {
  init: ModuleInit;
  caps: CapsVaultView;
  deps: ModuleDeps;
};

/**
 * Module definition for the orchestrator.
 * Use this for explicit deps declaration and consistent module metadata.
 */
export type ModuleDef<Name extends string = string> = {
  name: Name;
  /**
   * Hard dependencies: must exist and be initialized first.
   */
  deps?: string[];
  /**
   * Optional dependencies: used if present, ignored if missing.
   */
  optionalDeps?: string[];
  /**
   * Module factory. Prefer small, deterministic construction.
   */
  create: (ctx: ModuleFactoryArgs) => ModuleInstance<ModuleFacade> & {
    name: Name;
    scope: ModuleScope;
    port?: unknown;
  };
};

/**
 * Define a module with explicit deps.
 * This is the preferred entrypoint for module registration.
 */
export function defineModule<Name extends string>(def: ModuleDef<Name>) {
  return def;
}

export function createModule<
  Name extends string,
  Scope extends ModuleScope,
  Facade extends ModuleFacade,
  Port = undefined
>(args: {
  name: Name;
  scope: Scope;
  init: ModuleInit;
  caps: CapsVaultView;
  deps: ModuleDeps;
  build: (ctx: ModuleFactoryArgs) => {
    facade: Facade;
    hooks?: ModuleHooks; // optional, default {}
    port?: Port; // optional
  };
}): ModuleInstance<Facade> & { name: Name; scope: Scope; port?: Port } {
  const { facade, hooks, port } = args.build({
    init: args.init,
    caps: args.caps,
    deps: args.deps,
  });
  return {
    name: args.name,
    scope: args.scope,
    facade,
    hooks: hooks ?? {},
    port,
  };
}
