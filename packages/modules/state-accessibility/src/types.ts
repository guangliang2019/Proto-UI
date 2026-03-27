import type { AccessibilityStateName, BorrowedStateHandle, ModuleInstance } from '@proto.ui/core';
import type { PropsBaseType } from '@proto.ui/types';

export type StateAccessibilityFacade = {
  get(name: AccessibilityStateName): BorrowedStateHandle<boolean, PropsBaseType>;
};

export type StateAccessibilityModule = ModuleInstance<StateAccessibilityFacade> & {
  name: 'state-accessibility';
  scope: 'instance';
};
