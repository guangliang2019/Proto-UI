import type { DefHandle } from './handles';
import type { FocusableConfigPatch, FocusableHandle } from './focus';
import {
  __AS_HOOK_CURRENT_DEF,
  __AS_HOOK_PRIV_FACADES,
  __AS_HOOK_RUNTIME,
  type AsHookRuntime,
} from './prototype';

export function asFocusable(patch?: FocusableConfigPatch): FocusableHandle<any> {
  const def = (globalThis as any)[__AS_HOOK_CURRENT_DEF] as DefHandle<any, any> | undefined;
  if (!def) {
    throw new Error(`[AsHook] no active setup context for asFocusable.`);
  }

  const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
  if (!rt) {
    throw new Error(`[AsHook] runtime not available for asFocusable.`);
  }

  rt.ensureSetup(`asHook(asFocusable)`);
  rt.register('asFocusable', { privileged: true, mode: 'configurable' });

  const facades = (def as any)[__AS_HOOK_PRIV_FACADES] as Record<string, any> | undefined;
  const facade = facades?.focus as { getFocusable: () => FocusableHandle<any> } | undefined;

  if (!facade || typeof facade.getFocusable !== 'function') {
    throw new Error(`[AsHook] focus facade unavailable for asFocusable.`);
  }

  const handle = facade.getFocusable();
  if (patch) {
    handle.configure(patch);
  }
  return handle;
}
