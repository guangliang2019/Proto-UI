import type { AsHookRuntime } from './prototype';
import type { DefHandle } from './handles';

export type ActiveAsHookContext = Readonly<{
  def: DefHandle<any, any>;
  rt: AsHookRuntime;
  facades: Record<string, unknown>;
  ports: Record<string, unknown>;
}>;

const activeAsHookContexts: ActiveAsHookContext[] = [];
const asHookRuntimeByDef = new WeakMap<object, AsHookRuntime>();

export function enterActiveAsHookContext(ctx: ActiveAsHookContext): void {
  activeAsHookContexts.push(ctx);
}

export function exitActiveAsHookContext(): void {
  activeAsHookContexts.pop();
}

export function getActiveAsHookContext(name: string): ActiveAsHookContext {
  const ctx = activeAsHookContexts.at(-1);
  if (!ctx) {
    throw new Error(`[AsHook] no active setup context for ${name}.`);
  }
  return ctx;
}

export function bindAsHookRuntime(def: object, runtime: AsHookRuntime): void {
  asHookRuntimeByDef.set(def, runtime);
}

export function getAsHookRuntime(def: object): AsHookRuntime | undefined {
  return asHookRuntimeByDef.get(def);
}
