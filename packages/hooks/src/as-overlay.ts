import type { OverlayConfigPatch, OverlayHandle } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asOverlay(patch?: OverlayConfigPatch): OverlayHandle<any> {
  const { rt, facades } = getActiveAsHookContext('asOverlay');
  rt.ensureSetup(`asHook(asOverlay)`);
  rt.register('asOverlay', { privileged: true, mode: 'configurable' });

  const facade = facades.overlay as { getOverlay: () => OverlayHandle<any> } | undefined;
  if (!facade || typeof facade.getOverlay !== 'function') {
    throw new Error(`[AsHook] overlay facade unavailable for asOverlay.`);
  }

  const handle = facade.getOverlay();
  if (patch) handle.configure(patch);
  return handle;
}
