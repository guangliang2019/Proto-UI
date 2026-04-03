import type { FocusGroupConfigPatch, FocusGroupHandle } from './focus';
import { getCoreHookBackend } from './as-hook-backends';

export function asFocusGroup(patch?: FocusGroupConfigPatch): FocusGroupHandle<any> {
  const backend = getCoreHookBackend('asFocusGroup');
  if (!backend) {
    throw new Error(`[AsHook] runtime backend unavailable for asFocusGroup.`);
  }
  return backend(patch);
}
