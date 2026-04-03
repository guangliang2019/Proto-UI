import { defineAsHook } from '@proto.ui/core';
import { asButton } from '../button/as-button';
import { DROPDOWN_CONTEXT, DROPDOWN_FAMILY } from './shared';
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
    def.anatomy.claim(DROPDOWN_FAMILY, { role: 'trigger' });
    asButton();
    const focused = def.state.fromInteraction('focused');

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
      run.context.update(DROPDOWN_CONTEXT, (prev) => ({
        ...prev,
        open: !prev.open,
        activeValue: prev.open ? '' : prev.activeValue,
        suppressItemNavigation: false,
      }));
    });

    def.event.onGlobal('key.down', (run, ev) => {
      const ownDisabled = !!run.props.get().disabled;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (ownDisabled || ctx.disabled) return;
      if (!focused.get()) return;

      const key = ev?.detail?.key;
      if (key !== 'ArrowDown' && key !== 'ArrowUp') return;

      const content = run.anatomy.partsOf(DROPDOWN_FAMILY, 'content')[0] ?? null;
      const focusFirst = content?.getExpose('focusFirst') as (() => void) | null;
      const focusLast = content?.getExpose('focusLast') as (() => void) | null;

      run.context.update(DROPDOWN_CONTEXT, (prev) => ({ ...prev, suppressItemNavigation: true }));

      if (!ctx.controlled && !ctx.open) {
        run.context.update(DROPDOWN_CONTEXT, (prev) => ({
          ...prev,
          open: true,
        }));
      }

      if (key === 'ArrowDown') {
        focusFirst?.();
        return;
      }
      focusLast?.();
    });
  },
});
