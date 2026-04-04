import type { FocusGroupConfigPatch, FocusGroupHandle } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asFocusGroup(patch?: FocusGroupConfigPatch): FocusGroupHandle<any> {
  const { rt, facades } = getActiveAsHookContext('asFocusGroup');
  rt.ensureSetup(`asHook(asFocusGroup)`);
  rt.register('asFocusGroup', { privileged: true, mode: 'configurable' });

  const facade = facades.focus as { getGroup: () => FocusGroupHandle<any> } | undefined;
  if (!facade || typeof facade.getGroup !== 'function') {
    throw new Error(`[AsHook] focus facade unavailable for asFocusGroup.`);
  }

  const handle = facade.getGroup();
  if (patch) handle.configure(patch);
  return handle;
}
