import type { FocusScopeConfigPatch, FocusScopeHandle } from './focus';
import { getCoreHookBackend } from './as-hook-backends';

export function asFocusScope(patch?: FocusScopeConfigPatch): FocusScopeHandle<any> {
  const backend = getCoreHookBackend('asFocusScope');
  if (!backend) {
    throw new Error(`[AsHook] runtime backend unavailable for asFocusScope.`);
  }
  return backend(patch);
}
