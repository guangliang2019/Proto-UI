import type { DefHandle } from './handles';
import type { FocusScopeConfigPatch, FocusScopeHandle } from './focus';
import {
  __AS_HOOK_CURRENT_DEF,
  __AS_HOOK_PRIV_FACADES,
  __AS_HOOK_RUNTIME,
  type AsHookRuntime,
} from './prototype';

export function asFocusScope(patch?: FocusScopeConfigPatch): FocusScopeHandle<any> {
  const def = (globalThis as any)[__AS_HOOK_CURRENT_DEF] as DefHandle<any, any> | undefined;
  if (!def) {
    throw new Error(`[AsHook] no active setup context for asFocusScope.`);
  }

  const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
  if (!rt) {
    throw new Error(`[AsHook] runtime not available for asFocusScope.`);
  }

  rt.ensureSetup(`asHook(asFocusScope)`);
  rt.register('asFocusScope', { privileged: true, mode: 'configurable' });

  const facades = (def as any)[__AS_HOOK_PRIV_FACADES] as Record<string, any> | undefined;
  const facade = facades?.focus as { getScope: () => FocusScopeHandle<any> } | undefined;

  if (!facade || typeof facade.getScope !== 'function') {
    throw new Error(`[AsHook] focus facade unavailable for asFocusScope.`);
  }

  const handle = facade.getScope();
  if (patch) {
    handle.configure(patch);
  }
  return handle;
}
