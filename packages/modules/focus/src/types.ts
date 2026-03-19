import type {
  FocusFacts,
  FocusScopeConfig,
  FocusRequestOptions,
  FocusScopeConfigPatch,
  FocusScopeHandle,
  FocusScopeKey,
  FocusableConfig,
  FocusableConfigPatch,
  FocusableHandle,
  ModuleInstance,
} from '@proto-ui/core';
import type { PropsBaseType } from '@proto-ui/types';

export type FocusFacade = {
  getFocusable<P extends PropsBaseType = PropsBaseType>(): FocusableHandle<P>;
  getScope<P extends PropsBaseType = PropsBaseType>(): FocusScopeHandle<P>;
};

export type FocusPort = {
  configureFocusable(patch: FocusableConfigPatch): void;
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
  getEffectiveScopeKey(): FocusScopeKey | undefined;
  getFocusableConfig(): FocusableConfig;
  getScopeConfig(): FocusScopeConfig;
  getFacts(): FocusFacts;
  getWarnings(): readonly string[];
};

export type FocusModule = ModuleInstance<FocusFacade> & {
  name: 'focus';
  scope: 'instance';
  port: FocusPort;
};
