import type { FocusScopeConfigPatch, FocusScopeHandle } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asFocusScope(patch?: FocusScopeConfigPatch): FocusScopeHandle<any> {
  const { rt, facades } = getActiveAsHookContext('asFocusScope');
  rt.ensureSetup(`asHook(asFocusScope)`);
  rt.register('asFocusScope', { privileged: true, mode: 'configurable' });

  const facade = facades.focus as { getScope: () => FocusScopeHandle<any> } | undefined;
  if (!facade || typeof facade.getScope !== 'function') {
    throw new Error(`[AsHook] focus facade unavailable for asFocusScope.`);
  }

  const handle = facade.getScope();
  if (patch) handle.configure(patch);
  return handle;
}
