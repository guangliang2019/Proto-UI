import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asButton } from '../button';
import { SELECT_CONTEXT, SELECT_FAMILY } from './shared';
import type {
  SelectTriggerAsHookContract,
  SelectTriggerExposes,
  SelectTriggerProps,
} from './types';

const SELECT_TRIGGER_OPEN_HANDLED = '__selectTriggerOpenHandled';
const SELECT_ROVING_HANDLED = '__selectRovingHandled';

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

  const requestOpen = (run: any) => {
    run.context.update(SELECT_CONTEXT, (prev) => ({
      ...prev,
      activeValue: prev.value,
      open: prev.controlledOpen ? prev.open : true,
    }));
  };

  def.event.on('press.commit', (run, ev) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled || ctx.controlledOpen) return;
    const key = ev?.detail?.key;
    if (key === 'Enter' || key === ' ') {
      if (ctx.open) return;
      requestOpen(run);
      return;
    }
    run.context.update(SELECT_CONTEXT, (prev) => ({
      ...prev,
      open: !prev.open,
      activeValue: prev.open ? '' : prev.value,
    }));
  });

  def.event.onGlobal('key.down', (run, ev) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled) return;
    if (ctx.open) return;
    if (!focused.get()) return;
    if ((ev?.detail as any)?.[SELECT_TRIGGER_OPEN_HANDLED]) return;

    const key = ev?.detail?.key;
    if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
    if (ev?.detail) (ev.detail as any)[SELECT_TRIGGER_OPEN_HANDLED] = true;
    if (ev?.detail) (ev.detail as any)[SELECT_ROVING_HANDLED] = true;
    ev?.detail?.preventDefault?.();
    requestOpen(run);
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
