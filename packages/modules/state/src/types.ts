import type { ModuleInstance, OwnedStateHandle, Unsubscribe } from '@proto-ui/core';
import type {
  EnumStateDefineSpec,
  StringStateDefineSpec,
  NumberRangeStateDefineSpec,
  NumberDiscreteStateDefineSpec,
  StateEvent,
} from '@proto-ui/types';

export type InternalStateWatchCallback<V> = (ctx: unknown, e: StateEvent<V>) => void;

export type StatePort = {
  /**
   * Internal watch API (ctx is opaque to state-module; runtime injects it).
   *
   * - register is expected to be setup-only by runtime policy
   * - invoke happens during runtime set(), and ctx should reflect the current callback context
   */
  watch<V>(handle: OwnedStateHandle<V>, cb: InternalStateWatchCallback<V>): Unsubscribe;

  /**
   * Emit a disconnect event to all watchers of this state slot.
   * Intended for unmount/dispose and for interaction modules.
   */
  disconnect(handle: OwnedStateHandle<any>): void;

  /**
   * Create an internal "observed" view for a slot.
   * This is NOT the component-author facing ObservedStateHandle type (that one is typed with RunHandle<P>),
   * but it's sufficient for internal modules that only need get+watch with opaque ctx.
   */
  createObservedHandle<V>(handle: OwnedStateHandle<V>): {
    get(): V;
    watch(cb: InternalStateWatchCallback<V>): Unsubscribe;
  };

  /**
   * Create an internal "borrowed" view for a slot (get+set+setDefault+watch).
   * Again: internal-only, opaque ctx.
   */
  createBorrowedHandle<V>(handle: OwnedStateHandle<V>): {
    get(): V;
    setDefault(v: V): void;
    set(v: V, reason?: unknown): void;
    watch(cb: InternalStateWatchCallback<V>): Unsubscribe;
  };
};

export type StateFacade = {
  bool: (semantic: string, defaultValue: boolean) => OwnedStateHandle<boolean>;

  enum: <O extends readonly string[]>(
    semantic: string,
    defaultValue: O[number],
    spec: EnumStateDefineSpec<O>
  ) => OwnedStateHandle<O[number]>;

  string: (
    semantic: string,
    defaultValue: string,
    spec?: StringStateDefineSpec
  ) => OwnedStateHandle<string>;

  numberRange: (
    semantic: string,
    defaultValue: number,
    spec: NumberRangeStateDefineSpec
  ) => OwnedStateHandle<number>;

  numberDiscrete: (
    semantic: string,
    defaultValue: number,
    spec?: NumberDiscreteStateDefineSpec
  ) => OwnedStateHandle<number>;
};

export type StateModule = ModuleInstance<StateFacade> & {
  name: 'state';
  scope: 'instance';
};
