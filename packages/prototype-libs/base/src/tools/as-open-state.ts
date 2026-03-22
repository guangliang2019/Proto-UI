import { defineAsHook } from '@proto-ui/core';
import type { ExposeMethod, ExposeState, OwnedStateHandle, RunHandle, State } from '@proto-ui/core';

export type OpenStateOptions = {
  prop?: string;
  defaultProp?: string;
  disabledProp?: string;
  stateKey?: string;
  exposeStateKey?: string;
  exposeOpenMethodKey?: string;
  exposeCloseMethodKey?: string;
  exposeToggleMethodKey?: string;
};

export type OpenStateExposes = {
  open: ExposeState<boolean>;
  openDropdown: ExposeMethod<(reason?: string) => void>;
  close: ExposeMethod<(reason?: string) => void>;
  toggle: ExposeMethod<(reason?: string) => void>;
};

export type OpenStateHandles = {
  open: State<boolean>;
};

export const asOpenState = defineAsHook<
  any,
  OpenStateExposes,
  OpenStateHandles,
  OpenStateOptions | undefined
>({
  name: 'asOpenState',
  mode: 'configurable',
  setup(def, options, api) {
    const prop = options?.prop ?? 'open';
    const defaultProp = options?.defaultProp ?? 'defaultOpen';
    const disabledProp = options?.disabledProp ?? 'disabled';
    const stateKey = options?.stateKey ?? 'open';
    const exposeStateKey = options?.exposeStateKey ?? 'open';
    const exposeOpenMethodKey = options?.exposeOpenMethodKey ?? 'openDropdown';
    const exposeCloseMethodKey = options?.exposeCloseMethodKey ?? 'close';
    const exposeToggleMethodKey = options?.exposeToggleMethodKey ?? 'toggle';

    def.props.define({
      [prop]: { type: 'boolean', empty: 'fallback' },
      [defaultProp]: { type: 'boolean', empty: 'fallback' },
      [disabledProp]: { type: 'boolean', empty: 'fallback' },
    } as any);
    def.props.setDefaults({
      [defaultProp]: false,
      [disabledProp]: false,
    } as any);

    const open = def.state.bool(stateKey, false);
    api.store.prop = prop;
    api.store.defaultProp = defaultProp;
    api.store.disabledProp = disabledProp;
    api.store.open = open;
    api.store.controlled = false;
    api.store.disabled = false;

    const syncFromProps = (run: RunHandle<any>) => {
      const controlled = run.props.isProvided(prop as any);
      api.store.controlled = controlled;
      api.store.disabled = !!run.props.get()[disabledProp as any];
      const nextOpen = controlled
        ? !!run.props.get()[prop as any]
        : !!run.props.get()[defaultProp as any];
      open.set(nextOpen, 'reason: asOpenState.syncFromProps => initialize');
    };

    const syncControlled = (run: RunHandle<any>, nextOpen: boolean) => {
      api.store.controlled = run.props.isProvided(prop as any);
      api.store.disabled = !!run.props.get()[disabledProp as any];
      if (!api.store.controlled) return;
      open.set(nextOpen, 'reason: asOpenState.syncControlled => controlled sync');
    };

    const setOpen = (next: boolean, reason?: string) => {
      open.set(next, reason ?? 'reason: asOpenState.setOpen');
    };

    api.store.syncFromProps = syncFromProps;
    api.store.syncControlled = syncControlled;
    api.store.setOpen = setOpen;

    def.expose.state(exposeStateKey, open);
    def.expose.method(exposeOpenMethodKey, (reason?: string) => {
      setOpen(true, reason ?? 'reason: asOpenState.openNow');
    });
    def.expose.method(exposeCloseMethodKey, (reason?: string) => {
      setOpen(false, reason ?? 'reason: asOpenState.close');
    });
    def.expose.method(exposeToggleMethodKey, (reason?: string) => {
      setOpen(!open.get(), reason ?? 'reason: asOpenState.toggle');
    });

    def.lifecycle.onCreated((run) => {
      syncFromProps(run);
    });

    def.props.watch([prop as any, disabledProp as any], (run, next) => {
      syncControlled(run, !!next[prop as keyof typeof next]);
      api.store.disabled = !!next[disabledProp as keyof typeof next];
    });
  },
});
