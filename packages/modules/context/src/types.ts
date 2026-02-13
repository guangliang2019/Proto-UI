// packages/modules/context/src/types.ts
import type { ModuleInstance } from '@proto-ui/core';
import type { ContextKey, JsonObject } from '@proto-ui/types';
import type { ContextInstanceToken } from './caps';

export type ContextCallbackCtx = unknown;

export type ContextChangeCb<T extends JsonObject> = (
  ctx: ContextCallbackCtx,
  next: T,
  prev: T
) => void;

export type ContextChangeCbOptional<T extends JsonObject> = (
  ctx: ContextCallbackCtx,
  next: T | null,
  prev: T | null
) => void;

export type ContextFacade = {
  // setup-only
  provide<T extends JsonObject>(
    key: ContextKey<T>,
    defaultValue: T
  ): (next: T | ((prev: T) => T)) => void;

  subscribe<T extends JsonObject>(key: ContextKey<T>, onChange?: ContextChangeCb<T>): void;

  trySubscribe<T extends JsonObject>(
    key: ContextKey<T>,
    onChange?: ContextChangeCbOptional<T>
  ): void;

  // runtime-only
  read<T extends JsonObject>(key: ContextKey<T>): T;
  tryRead<T extends JsonObject>(key: ContextKey<T>): T | null;

  update<T extends JsonObject>(key: ContextKey<T>, next: T | ((prev: T) => T)): void;

  tryUpdate<T extends JsonObject>(key: ContextKey<T>, next: T | ((prev: T) => T)): boolean;
};

export type ContextProviderEntry = {
  instance: ContextInstanceToken;
  key: ContextKey<any>;
  value: JsonObject;
};

export type ContextSubscriptionEntry = {
  instance: ContextInstanceToken;
  key: ContextKey<any>;
  mode: 'required' | 'optional';
  callbackCount: number;
};

export type ContextCallbackTask = {
  instance: ContextInstanceToken;
  key: ContextKey<any>;
  next: JsonObject | null;
  prev: JsonObject | null;
  callbackCount: number;
};

export type ContextPort = {
  dumpProviders(): readonly ContextProviderEntry[];
  dumpSubscriptions(): readonly ContextSubscriptionEntry[];
  dumpCallbackQueue(): readonly ContextCallbackTask[];
};

export type ContextModule = ModuleInstance<ContextFacade> & {
  name: 'context';
  scope: 'singleton';
};
