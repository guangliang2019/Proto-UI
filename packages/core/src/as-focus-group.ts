import type { DefHandle } from './handles';
import type { FocusGroupConfigPatch, FocusGroupHandle } from './focus';
import {
  __AS_HOOK_CURRENT_DEF,
  __AS_HOOK_PRIV_FACADES,
  __AS_HOOK_RUNTIME,
  type AsHookRuntime,
} from './prototype';

export function asFocusGroup(patch?: FocusGroupConfigPatch): FocusGroupHandle<any> {
  const def = (globalThis as any)[__AS_HOOK_CURRENT_DEF] as DefHandle<any, any> | undefined;
  if (!def) {
    throw new Error(`[AsHook] no active setup context for asFocusGroup.`);
  }

  const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
  if (!rt) {
    throw new Error(`[AsHook] runtime not available for asFocusGroup.`);
  }

  rt.ensureSetup(`asHook(asFocusGroup)`);
  rt.register('asFocusGroup', { privileged: true, mode: 'configurable' });

  const facades = (def as any)[__AS_HOOK_PRIV_FACADES] as Record<string, any> | undefined;
  const facade = facades?.focus as { getGroup: () => FocusGroupHandle<any> } | undefined;

  if (!facade || typeof facade.getGroup !== 'function') {
    throw new Error(`[AsHook] focus facade unavailable for asFocusGroup.`);
  }

  const handle = facade.getGroup();
  if (patch) {
    handle.configure(patch);
  }
  return handle;
}
