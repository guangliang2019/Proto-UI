import type { OverlayConfigPatch, OverlayHandle } from './overlay';
import { getCoreHookBackend } from './as-hook-backends';

export function asOverlay(patch?: OverlayConfigPatch): OverlayHandle<any> {
  const backend = getCoreHookBackend('asOverlay');
  if (!backend) {
    throw new Error(`[AsHook] runtime backend unavailable for asOverlay.`);
  }
  return backend(patch);
}
