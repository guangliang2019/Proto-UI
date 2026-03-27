import { defineAsHook } from '@proto.ui/core';
import { asOpenState } from '../tools';
import { DROPDOWN_CONTEXT, DROPDOWN_FAMILY, registerDropdownFamily } from './shared';
import type { DropdownRootAsHookContract, DropdownRootExposes, DropdownRootProps } from './types';

export const asDropdownRoot = defineAsHook<
  DropdownRootProps,
  DropdownRootExposes,
  DropdownRootAsHookContract
>({
  name: 'as-dropdown-root',
  mode: 'once',
  setup(def) {
    registerDropdownFamily(def as any);
    def.anatomy.claim(DROPDOWN_FAMILY, { role: 'root' });

    def.props.define({
      open: { type: 'boolean', empty: 'fallback' },
      defaultOpen: { type: 'boolean', empty: 'fallback' },
      disabled: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      defaultOpen: false,
      disabled: false,
    });

    const updateContext = def.context.provide(DROPDOWN_CONTEXT, {
      open: false,
      controlled: false,
      disabled: false,
    });
    const openState = asOpenState();
    const open = openState.getState?.('open');
    let controlled = false;
    let disabled = false;

    const syncContext = () => {
      updateContext({
        open: open?.get() ?? false,
        controlled,
        disabled,
      });
    };

    def.context.subscribe(DROPDOWN_CONTEXT, (_run, next) => {
      if (controlled) return;
      open?.set(next.open, 'reason: dropdown context sync => open');
    });

    def.lifecycle.onCreated((run) => {
      controlled = run.props.isProvided('open');
      disabled = !!run.props.get().disabled;
      syncContext();
    });

    def.props.watch(['open', 'disabled'], (run, next) => {
      controlled = run.props.isProvided('open');
      disabled = !!next.disabled;
      syncContext();
    });

    open?.watch((_run, event) => {
      if (event.type !== 'next') return;
      syncContext();
    });
  },
});
