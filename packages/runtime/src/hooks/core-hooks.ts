import type { DefHandle } from '@proto.ui/core';
import {
  __AS_HOOK_CURRENT_DEF,
  __AS_HOOK_PRIV_FACADES,
  __AS_HOOK_RUNTIME,
  registerCoreHookBackends,
  type AsHookRuntime,
  type FocusableConfigPatch,
  type FocusableHandle,
  type FocusGroupConfigPatch,
  type FocusGroupHandle,
  type FocusScopeConfigPatch,
  type FocusScopeHandle,
  type OverlayConfigPatch,
  type OverlayHandle,
} from '@proto.ui/core';
import { asCollection } from './collection/as-collection';
import { asCollectionItem } from './collection/as-collection-item';

function getActiveDef(name: string): {
  def: DefHandle<any, any>;
  rt: AsHookRuntime;
  facades: Record<string, any> | undefined;
} {
  const def = (globalThis as any)[__AS_HOOK_CURRENT_DEF] as DefHandle<any, any> | undefined;
  if (!def) {
    throw new Error(`[AsHook] no active setup context for ${name}.`);
  }

  const rt = (def as any)[__AS_HOOK_RUNTIME] as AsHookRuntime | undefined;
  if (!rt) {
    throw new Error(`[AsHook] runtime not available for ${name}.`);
  }

  return {
    def,
    rt,
    facades: (def as any)[__AS_HOOK_PRIV_FACADES] as Record<string, any> | undefined,
  };
}

registerCoreHookBackends({
  asFocusable(patch?: FocusableConfigPatch): FocusableHandle<any> {
    const { rt, facades } = getActiveDef('asFocusable');
    rt.ensureSetup(`asHook(asFocusable)`);
    rt.register('asFocusable', { privileged: true, mode: 'configurable' });

    const facade = facades?.focus as { getFocusable: () => FocusableHandle<any> } | undefined;
    if (!facade || typeof facade.getFocusable !== 'function') {
      throw new Error(`[AsHook] focus facade unavailable for asFocusable.`);
    }

    const handle = facade.getFocusable();
    if (patch) handle.configure(patch);
    return handle;
  },

  asFocusGroup(patch?: FocusGroupConfigPatch): FocusGroupHandle<any> {
    const { rt, facades } = getActiveDef('asFocusGroup');
    rt.ensureSetup(`asHook(asFocusGroup)`);
    rt.register('asFocusGroup', { privileged: true, mode: 'configurable' });

    const facade = facades?.focus as { getGroup: () => FocusGroupHandle<any> } | undefined;
    if (!facade || typeof facade.getGroup !== 'function') {
      throw new Error(`[AsHook] focus facade unavailable for asFocusGroup.`);
    }

    const handle = facade.getGroup();
    if (patch) handle.configure(patch);
    return handle;
  },

  asFocusScope(patch?: FocusScopeConfigPatch): FocusScopeHandle<any> {
    const { rt, facades } = getActiveDef('asFocusScope');
    rt.ensureSetup(`asHook(asFocusScope)`);
    rt.register('asFocusScope', { privileged: true, mode: 'configurable' });

    const facade = facades?.focus as { getScope: () => FocusScopeHandle<any> } | undefined;
    if (!facade || typeof facade.getScope !== 'function') {
      throw new Error(`[AsHook] focus facade unavailable for asFocusScope.`);
    }

    const handle = facade.getScope();
    if (patch) handle.configure(patch);
    return handle;
  },

  asOverlay(patch?: OverlayConfigPatch): OverlayHandle<any> {
    const { rt, facades } = getActiveDef('asOverlay');
    rt.ensureSetup(`asHook(asOverlay)`);
    rt.register('asOverlay', { privileged: true, mode: 'configurable' });

    const facade = facades?.overlay as { getOverlay: () => OverlayHandle<any> } | undefined;
    if (!facade || typeof facade.getOverlay !== 'function') {
      throw new Error(`[AsHook] overlay facade unavailable for asOverlay.`);
    }

    const handle = facade.getOverlay();
    if (patch) handle.configure(patch);
    return handle;
  },

  asTrigger(): void {
    const { rt, facades } = getActiveDef('asTrigger');
    rt.ensureSetup(`asHook(asTrigger)`);
    const reg = rt.register('asTrigger', { privileged: true, mode: 'once' });
    if (reg.action !== 'setup') return;

    const facade = facades?.['as-trigger'] as { apply: () => void } | undefined;
    if (!facade || typeof facade.apply !== 'function') {
      throw new Error(`[AsHook] asTrigger facade unavailable.`);
    }

    facade.apply();
  },

  asCollection,
  asCollectionItem,
});
