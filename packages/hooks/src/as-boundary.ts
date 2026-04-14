import type { BoundaryConfigPatch, BoundaryHandle } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asBoundary(patch?: BoundaryConfigPatch): BoundaryHandle<any> {
  const { rt, facades } = getActiveAsHookContext('asBoundary');
  rt.ensureSetup('asHook(asBoundary)');
  rt.register('asBoundary', { privileged: true, mode: 'configurable' });

  const facade = facades.boundary as { getBoundary: () => BoundaryHandle<any> } | undefined;
  if (!facade || typeof facade.getBoundary !== 'function') {
    throw new Error('[AsHook] boundary facade unavailable for asBoundary.');
  }

  const handle = facade.getBoundary();
  if (patch) handle.configure(patch);
  return handle;
}
