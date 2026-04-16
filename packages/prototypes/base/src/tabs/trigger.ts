import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asCollectionItem, asFocusable } from '@proto.ui/hooks';
import { asButton } from '../button';
import { TABS_CONTEXT, TABS_FAMILY, TABS_FOCUS_GROUP } from './shared';
import type { TabsTriggerAsHookContract, TabsTriggerExposes, TabsTriggerProps } from './types';

function syncSelectedFromContext(
  nextValue: string,
  ownValue: string,
  selected: { set(value: boolean, reason?: string): void }
): void {
  selected.set(ownValue === nextValue, 'reason: tabs context sync => selected');
}

function setupTabsTrigger(def: DefHandle<TabsTriggerProps, TabsTriggerExposes>): void {
  asButton();
  const focusable = asFocusable({ groupKey: TABS_FOCUS_GROUP });
  const focused = def.state.fromInteraction('focused');
  const selected = def.state.fromAccessibility('selected');
  asCollectionItem({
    family: TABS_FAMILY,
    role: 'trigger',
    getMeta: (run) => {
      const props = run.props.get();
      return {
        value: props.value ?? '',
        disabled: !!props.disabled,
      };
    },
  });

  def.props.define({
    value: { type: 'string', empty: 'fallback' },
    disabled: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    value: '',
    disabled: false,
  });

  const disabled = def.state.fromInteraction('disabled');
  let ownValue = '';
  def.expose.state('selected', selected);

  def.context.subscribe(TABS_CONTEXT, (_run, next) => {
    syncSelectedFromContext(next.value, ownValue, selected);
  });

  def.lifecycle.onMounted((run) => {
    ownValue = run.props.get().value ?? '';
    const ctx = run.context.read(TABS_CONTEXT);
    syncSelectedFromContext(ctx.value, ownValue, selected);
  });

  def.props.watch(['value'], (run, next) => {
    ownValue = next.value ?? '';
    const ctx = run.context.read(TABS_CONTEXT);
    syncSelectedFromContext(ctx.value, ownValue, selected);
  });

  const updateActiveValue = (run: any) => {
    const nextValue = run.props.get().value ?? '';
    run.context.update(TABS_CONTEXT, (prev: any) => {
      if (prev.activeValue === nextValue) return prev;
      return { ...prev, activeValue: nextValue };
    });
  };

  def.event.on('press.commit', (run) => {
    if (disabled.get()) return;
    const nextValue = run.props.get().value ?? '';
    const ctx = run.context.read(TABS_CONTEXT);
    updateActiveValue(run);
    if (ctx.controlled) return;
    run.context.update(TABS_CONTEXT, (prev) => ({ ...prev, value: nextValue }));
  });

  def.event.on('native:focus', (run) => {
    if (disabled.get()) return;
    const nextValue = run.props.get().value ?? '';
    const ctx = run.context.read(TABS_CONTEXT);
    updateActiveValue(run);
    if (ctx.controlled) return;
    if (ctx.activationMode !== 'automatic') return;
    if (ctx.value === nextValue) return;
    run.context.update(TABS_CONTEXT, (prev) => ({ ...prev, value: nextValue }));
  });

  def.event.onGlobal('key.down', (run, ev) => {
    if (disabled.get()) return;
    if (!focused.get()) return;
    // Keep one roving move per keyboard event without depending on propagation phase semantics.
    if ((ev?.detail as any)?.__tabsRovingHandled) return;

    const key = ev?.detail?.key;
    const orientation = run.context.read(TABS_CONTEXT).orientation;
    const list = run.anatomy.partsOf(TABS_FAMILY, 'list')[0] ?? null;
    const focusFirst = list?.getExpose('focusFirst') as (() => void) | null;
    const focusLast = list?.getExpose('focusLast') as (() => void) | null;
    const focusNext = list?.getExpose('focusNext') as (() => void) | null;
    const focusPrev = list?.getExpose('focusPrev') as (() => void) | null;
    if (key === 'Home') {
      (ev!.detail as any).__tabsRovingHandled = true;
      ev?.detail?.preventDefault?.();
      focusFirst?.();
      return;
    }
    if (key === 'End') {
      (ev!.detail as any).__tabsRovingHandled = true;
      ev?.detail?.preventDefault?.();
      focusLast?.();
      return;
    }
    if (orientation === 'horizontal' && key === 'ArrowRight') {
      (ev!.detail as any).__tabsRovingHandled = true;
      ev?.detail?.preventDefault?.();
      focusNext?.();
      return;
    }
    if (orientation === 'horizontal' && key === 'ArrowLeft') {
      (ev!.detail as any).__tabsRovingHandled = true;
      ev?.detail?.preventDefault?.();
      focusPrev?.();
      return;
    }
    if (orientation === 'vertical' && key === 'ArrowDown') {
      (ev!.detail as any).__tabsRovingHandled = true;
      ev?.detail?.preventDefault?.();
      focusNext?.();
      return;
    }
    if (orientation === 'vertical' && key === 'ArrowUp') {
      (ev!.detail as any).__tabsRovingHandled = true;
      ev?.detail?.preventDefault?.();
      focusPrev?.();
    }
  });
}

export const asTabsTrigger = defineAsHook<
  TabsTriggerProps,
  TabsTriggerExposes,
  TabsTriggerAsHookContract
>({
  name: 'as-tabs-trigger',
  mode: 'once',
  setup: setupTabsTrigger,
});

const tabsTrigger = definePrototype({
  name: 'base-tabs-trigger',
  setup: setupTabsTrigger,
});

export default tabsTrigger;
