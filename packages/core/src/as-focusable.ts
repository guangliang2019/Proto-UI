import type { FocusableConfigPatch, FocusableHandle } from './focus';
import { getCoreHookBackend } from './as-hook-backends';

export function asFocusable(patch?: FocusableConfigPatch): FocusableHandle<any> {
  const backend = getCoreHookBackend('asFocusable');
  if (!backend) {
    throw new Error(`[AsHook] runtime backend unavailable for asFocusable.`);
  }
  return backend(patch);
}
