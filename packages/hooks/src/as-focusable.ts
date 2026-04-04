import type { FocusableConfigPatch, FocusableHandle } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asFocusable(patch?: FocusableConfigPatch): FocusableHandle<any> {
  const { rt, facades } = getActiveAsHookContext('asFocusable');
  rt.ensureSetup(`asHook(asFocusable)`);
  rt.register('asFocusable', { privileged: true, mode: 'configurable' });

  const facade = facades.focus as { getFocusable: () => FocusableHandle<any> } | undefined;
  if (!facade || typeof facade.getFocusable !== 'function') {
    throw new Error(`[AsHook] focus facade unavailable for asFocusable.`);
  }

  const handle = facade.getFocusable();
  if (patch) handle.configure(patch);
  return handle;
}
