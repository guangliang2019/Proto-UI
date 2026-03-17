import type { BorrowedStateHandle, InteractionStateName, ModuleInstance } from '@proto-ui/core';
import type { PropsBaseType } from '@proto-ui/types';

export type StateInteractionFacade = {
  get(name: InteractionStateName): BorrowedStateHandle<boolean, PropsBaseType>;
};

export type StateInteractionModule = ModuleInstance<StateInteractionFacade> & {
  name: 'state-interaction';
  scope: 'instance';
};
