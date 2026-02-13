import type { DefHandle } from './handles';
import {
  __AS_HOOK_CURRENT_DEF,
  __AS_HOOK_PRIV_FACADES,
  __AS_HOOK_RUNTIME,
  type AsHookRuntime,
} from './prototype';

export function asTrigger(): void {
  const def = (globalThis as any)[__AS_HOOK_CURRENT_DEF] as DefHandle<any, any> | undefined;
  if (!def) {
    throw new Error(`[AsHook] no active setup context for asTrigger.`);
  }

  const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
  if (!rt) {
    throw new Error(`[AsHook] runtime not available for asTrigger.`);
  }

  rt.ensureSetup(`asHook(asTrigger)`);
  const reg = rt.register('asTrigger', { privileged: true });
  if (!reg.run) return;

  const facades = (def as any)[__AS_HOOK_PRIV_FACADES] as Record<string, any> | undefined;
  const facade = facades?.['as-trigger'] as { apply: () => void } | undefined;

  if (!facade || typeof facade.apply !== 'function') {
    throw new Error(`[AsHook] asTrigger facade unavailable.`);
  }

  facade.apply();
}
