// packages/modules/expose-state/src/types.ts
import type { ModuleInstance, ModulePort, Unsubscribe } from '@proto-ui/core';
import type { StateEvent, StateSpec } from '@proto-ui/types';

export type ExposeStateExternalHandle<V = any> = {
  get(): V;
  subscribe(cb: (e: StateEvent<V>) => void): Unsubscribe;
  unsubscribe(off: Unsubscribe): void;
  spec: StateSpec;
};

export type ExposeStateFacade = {};

export type ExposeStateDiag = {
  key: string;
  kind: 'state' | 'value';
  valueType: string;
};

export type ExposeStatePort = ModulePort & {
  get(key: string): unknown | undefined;
  getAll(): Record<string, unknown>;
  getDiagnostics?(): readonly ExposeStateDiag[];
};

export type ExposeStateModule = ModuleInstance<ExposeStateFacade> & {
  name: 'expose-state';
  scope: 'instance';
};
