import { defineAsHook } from '@proto-ui/core';
import { asButton } from '../button/as-button';
import { DROPDOWN_CONTEXT, DROPDOWN_FAMILY, registerDropdownFamily } from './shared';
import type {
  DropdownTriggerAsHookContract,
  DropdownTriggerExposes,
  DropdownTriggerProps,
} from './types';

export const asDropdownTrigger = defineAsHook<
  DropdownTriggerProps,
  DropdownTriggerExposes,
  DropdownTriggerAsHookContract
>({
  name: 'as-dropdown-trigger',
  mode: 'once',
  setup(def) {
    registerDropdownFamily(def as any);
    def.anatomy.claim(DROPDOWN_FAMILY, { role: 'trigger' });
    asButton();

    def.props.define({
      disabled: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      disabled: false,
    });

    def.context.subscribe(DROPDOWN_CONTEXT);

    def.event.on('press.commit', (run) => {
      const ownDisabled = !!run.props.get().disabled;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (ownDisabled || ctx.disabled) return;
      if (ctx.controlled) return;
      run.context.update(DROPDOWN_CONTEXT, (prev) => ({ ...prev, open: !prev.open }));
    });
  },
});
