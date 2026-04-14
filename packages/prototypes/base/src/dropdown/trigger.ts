import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asButton } from '../button';
import { DROPDOWN_CONTEXT, DROPDOWN_FAMILY } from './shared';
import type {
  DropdownTriggerAsHookContract,
  DropdownTriggerExposes,
  DropdownTriggerProps,
} from './types';

const DROPDOWN_TRIGGER_OPEN_HANDLED = '__dropdownTriggerOpenHandled';
const DROPDOWN_ROVING_HANDLED = '__dropdownRovingHandled';
const DROPDOWN_OPEN_HANDLED = '__dropdownOpenHandled';

function setupDropdownTrigger(def: DefHandle<DropdownTriggerProps, DropdownTriggerExposes>): void {
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

  const resolveBoundaryValue = (run: any, direction: 'first' | 'last') => {
    const items = run.anatomy.partsOf(DROPDOWN_FAMILY, 'item');
    const ordered = direction === 'first' ? items : items.slice().reverse();
    for (const item of ordered) {
      const snapshot = (
        item.getExpose('getCollectionItem') as (() => Record<string, unknown>) | null
      )?.();
      if (!snapshot || snapshot.disabled) continue;
      const value = snapshot.value;
      if (typeof value === 'string' && value) return value;
    }
    return '';
  };

  const requestOpen = (run: any, direction: 'first' | 'last') => {
    const boundaryValue = resolveBoundaryValue(run, direction);
    run.context.update(DROPDOWN_CONTEXT, (prev) => ({
      ...prev,
      open: prev.controlled ? prev.open : true,
      activeValue: boundaryValue,
      openEntry: direction,
    }));
  };

  def.event.on('press.commit', (run, ev) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(DROPDOWN_CONTEXT);
    if (ownDisabled || ctx.disabled) return;
    const key = ev?.detail?.key;
    if (key === 'Enter' || key === ' ') {
      if (ev?.detail) (ev.detail as any)[DROPDOWN_OPEN_HANDLED] = true;
      if (ctx.open) return;
      requestOpen(run, 'first');
      return;
    }
    if (ctx.controlled) return;
    run.context.update(DROPDOWN_CONTEXT, (prev) => ({
      ...prev,
      open: !prev.open,
      activeValue: prev.open ? '' : prev.activeValue,
    }));
  });

  def.event.onGlobal('key.down', (run, ev) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(DROPDOWN_CONTEXT);
    if (ownDisabled || ctx.disabled) return;
    if (!focused.get()) return;
    if ((ev?.detail as any)?.[DROPDOWN_TRIGGER_OPEN_HANDLED]) return;

    const key = ev?.detail?.key;
    if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
    if (ev?.detail) (ev.detail as any)[DROPDOWN_TRIGGER_OPEN_HANDLED] = true;
    if (ev?.detail) (ev.detail as any)[DROPDOWN_ROVING_HANDLED] = true;
    if (ev?.detail) (ev.detail as any)[DROPDOWN_OPEN_HANDLED] = true;
    ev?.detail?.preventDefault?.();

    const content = run.anatomy.partsOf(DROPDOWN_FAMILY, 'content')[0] ?? null;
    const focusFirst = content?.getExpose('focusFirst') as (() => void) | null;
    const focusLast = content?.getExpose('focusLast') as (() => void) | null;

    if (ctx.open) {
      if (key === 'ArrowDown') {
        focusFirst?.();
        return;
      }
      if (key === 'ArrowUp') {
        focusLast?.();
      }
      return;
    }
    const direction = key === 'ArrowUp' ? 'last' : 'first';
    requestOpen(run, direction);
  });
}

export const asDropdownTrigger = defineAsHook<
  DropdownTriggerProps,
  DropdownTriggerExposes,
  DropdownTriggerAsHookContract
>({
  name: 'as-dropdown-trigger',
  mode: 'once',
  setup: setupDropdownTrigger,
});

const dropdownTrigger = definePrototype({
  name: 'base-dropdown-trigger',
  setup: setupDropdownTrigger,
});

export default dropdownTrigger;
