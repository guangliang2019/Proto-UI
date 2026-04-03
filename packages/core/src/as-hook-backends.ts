import type {
  FocusGroupConfigPatch,
  FocusGroupHandle,
  FocusScopeConfigPatch,
  FocusScopeHandle,
  FocusableConfigPatch,
  FocusableHandle,
} from './focus';
import type { OverlayConfigPatch, OverlayHandle } from './overlay';
import type { AsHookCaller } from './prototype';
import type {
  CollectionExposes,
  CollectionHandles,
  CollectionItemExposes,
  CollectionItemHandles,
  CollectionItemOptions,
  CollectionOptions,
} from './collection';

export type CoreHookBackendRegistry = {
  asFocusable?: (patch?: FocusableConfigPatch) => FocusableHandle<any>;
  asFocusGroup?: (patch?: FocusGroupConfigPatch) => FocusGroupHandle<any>;
  asFocusScope?: (patch?: FocusScopeConfigPatch) => FocusScopeHandle<any>;
  asOverlay?: (patch?: OverlayConfigPatch) => OverlayHandle<any>;
  asTrigger?: () => void;
  asCollection?: AsHookCaller<any, CollectionExposes, CollectionHandles, CollectionOptions>;
  asCollectionItem?: AsHookCaller<
    any,
    CollectionItemExposes,
    CollectionItemHandles,
    CollectionItemOptions<any>
  >;
};

const CORE_HOOK_BACKENDS = Symbol.for('@proto.ui/core-hook-backends');

function getStore(): CoreHookBackendRegistry {
  const root = globalThis as typeof globalThis & {
    [CORE_HOOK_BACKENDS]?: CoreHookBackendRegistry;
  };
  if (!root[CORE_HOOK_BACKENDS]) {
    root[CORE_HOOK_BACKENDS] = {};
  }
  return root[CORE_HOOK_BACKENDS]!;
}

export function registerCoreHookBackends(backends: Partial<CoreHookBackendRegistry>): void {
  Object.assign(getStore(), backends);
}

export function getCoreHookBackend<K extends keyof CoreHookBackendRegistry>(
  key: K
): CoreHookBackendRegistry[K] | undefined {
  return getStore()[key];
}
