import type {
  FocusFacts,
  FocusGroupConfig,
  FocusGroupConfigPatch,
  FocusGroupHandle,
  FocusGroupKey,
  FocusScopeConfig,
  FocusRequestOptions,
  FocusScopeConfigPatch,
  FocusScopeHandle,
  FocusScopeKey,
  FocusableConfig,
  FocusableConfigPatch,
  FocusableHandle,
  ModuleInstance,
} from '@proto.ui/core';
import type { PropsBaseType } from '@proto.ui/types';

export type FocusFacade = {
  getFocusable<P extends PropsBaseType = PropsBaseType>(): FocusableHandle<P>;
  getGroup<P extends PropsBaseType = PropsBaseType>(): FocusGroupHandle<P>;
  getScope<P extends PropsBaseType = PropsBaseType>(): FocusScopeHandle<P>;
};

export type FocusPort = {
  configureFocusable(patch: FocusableConfigPatch): void;
  configureGroup(patch: FocusGroupConfigPatch): void;
  configureScope(patch: FocusScopeConfigPatch): void;
  setDisabled(disabled: boolean): void;
  requestFocus(options?: FocusRequestOptions): void;
  blur(): void;
  focusFirst(): void;
  focusLast(): void;
  focusNext(): void;
  focusPrev(): void;
  focusSelected(): void;
  restoreFocus(): void;
  getEffectiveGroupKey(): FocusGroupKey | undefined;
  getEffectiveScopeKey(): FocusScopeKey | undefined;
  getFocusableConfig(): FocusableConfig;
  getGroupConfig(): FocusGroupConfig;
  getScopeConfig(): FocusScopeConfig;
  getFacts(): FocusFacts;
  getWarnings(): readonly string[];
};

export type FocusModule = ModuleInstance<FocusFacade> & {
  name: 'focus';
  scope: 'instance';
  port: FocusPort;
};
