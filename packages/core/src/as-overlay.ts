import type { DefHandle } from './handles';
import type { OverlayConfigPatch, OverlayHandle } from './overlay';
import {
  __AS_HOOK_CURRENT_DEF,
  __AS_HOOK_PRIV_FACADES,
  __AS_HOOK_RUNTIME,
  type AsHookRuntime,
} from './prototype';

export function asOverlay(patch?: OverlayConfigPatch): OverlayHandle<any> {
  const def = (globalThis as any)[__AS_HOOK_CURRENT_DEF] as DefHandle<any, any> | undefined;
  if (!def) {
    throw new Error(`[AsHook] no active setup context for asOverlay.`);
  }

  const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
  if (!rt) {
    throw new Error(`[AsHook] runtime not available for asOverlay.`);
  }

  rt.ensureSetup(`asHook(asOverlay)`);
  rt.register('asOverlay', { privileged: true, mode: 'configurable' });

  const facades = (def as any)[__AS_HOOK_PRIV_FACADES] as Record<string, any> | undefined;
  const facade = facades?.overlay as { getOverlay: () => OverlayHandle<any> } | undefined;

  if (!facade || typeof facade.getOverlay !== 'function') {
    throw new Error(`[AsHook] overlay facade unavailable for asOverlay.`);
  }

  const handle = facade.getOverlay();
  if (patch) {
    handle.configure(patch);
  }
  return handle;
}
