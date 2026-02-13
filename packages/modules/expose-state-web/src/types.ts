// packages/modules/expose-state-web/src/types.ts
import type { ModuleInstance, ModulePort } from '@proto-ui/core';
import type { StateSpec } from '@proto-ui/types';

export type ExposeStateWebFacade = {};

export type ExposeStateWebBinding = {
  stateId: string;
  key: string;
  kind: StateSpec['kind'];
  attr?: string;
  cssVar?: string;
};

export type ExposeStateWebPort = ModulePort & {
  isActive(): boolean;
  getExposedStateMap(): ReadonlyMap<string, ExposeStateWebBinding>;
};

export type ExposeStateWebModule = ModuleInstance<ExposeStateWebFacade> & {
  name: 'expose-state-web';
  scope: 'instance';
};
