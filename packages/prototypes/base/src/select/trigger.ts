import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asButton } from '../button';
import { SELECT_CONTEXT, SELECT_FAMILY } from './shared';
import type {
  SelectTriggerAsHookContract,
  SelectTriggerExposes,
  SelectTriggerProps,
} from './types';

function setupSelectTrigger(def: DefHandle<SelectTriggerProps, SelectTriggerExposes>): void {
  def.anatomy.claim(SELECT_FAMILY, { role: 'trigger' });
  asButton();
  const focused = def.state.fromInteraction('focused');

  def.props.define({
    disabled: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    disabled: false,
  });

  def.context.subscribe(SELECT_CONTEXT);

  def.event.on('press.commit', (run) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled || ctx.controlledOpen) return;
    run.context.update(SELECT_CONTEXT, (prev) => ({
      ...prev,
      open: !prev.open,
      activeValue: prev.open ? '' : prev.value,
      suppressItemNavigation: false,
    }));
  });

  def.event.onGlobal('key.down', (run, ev) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled) return;
    if (!focused.get()) return;

    const key = ev?.detail?.key;
    if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
    ev?.detail?.preventDefault?.();
    ev?.detail?.stopPropagation?.();

    run.context.update(SELECT_CONTEXT, (prev) => ({
      ...prev,
      suppressItemNavigation: true,
      activeValue: prev.value,
      open: prev.controlledOpen ? prev.open : true,
    }));
  });
}

export const asSelectTrigger = defineAsHook<
  SelectTriggerProps,
  SelectTriggerExposes,
  SelectTriggerAsHookContract
>({
  name: 'as-select-trigger',
  mode: 'once',
  setup: setupSelectTrigger,
});

const selectTrigger = definePrototype({
  name: 'base-select-trigger',
  setup: setupSelectTrigger,
});

export default selectTrigger;
