import { defineAsHook } from '@proto.ui/core';
import { asFocusable } from '@proto.ui/hooks';
import { asButton } from '../button/as-button';
import { TABS_CONTEXT, TABS_FAMILY, TABS_FOCUS_GROUP } from './shared';
import type { TabsTriggerAsHookContract, TabsTriggerExposes, TabsTriggerProps } from './types';

function syncSelectedFromContext(
  nextValue: string,
  ownValue: string,
  selected: { set(value: boolean, reason?: string): void }
): void {
  selected.set(ownValue === nextValue, 'reason: tabs context sync => selected');
}

export const asTabsTrigger = defineAsHook<
  TabsTriggerProps,
  TabsTriggerExposes,
  TabsTriggerAsHookContract
>({
  name: 'as-tabs-trigger',
  mode: 'once',
  setup(def) {
    def.anatomy.claim(TABS_FAMILY, { role: 'trigger' });
    asButton();
    const focusable = asFocusable({ groupKey: TABS_FOCUS_GROUP });
    const focused = def.state.fromInteraction('focused');
    const selected = def.state.fromAccessibility('selected');

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

    def.event.on('press.commit', (run) => {
      if (disabled.get()) return;
      const nextValue = run.props.get().value ?? '';
      const ctx = run.context.read(TABS_CONTEXT);
      if (ctx.controlled) return;
      run.context.update(TABS_CONTEXT, (prev) => ({ ...prev, value: nextValue }));
    });

    def.event.on('native:focus', (run) => {
      if (disabled.get()) return;
      const nextValue = run.props.get().value ?? '';
      const ctx = run.context.read(TABS_CONTEXT);
      if (ctx.controlled) return;
      if (ctx.activationMode !== 'automatic') return;
      if (ctx.value === nextValue) return;
      run.context.update(TABS_CONTEXT, (prev) => ({ ...prev, value: nextValue }));
    });

    def.event.onGlobal('key.down', (run, ev) => {
      if (disabled.get()) return;
      if (!focused.get()) return;

      const key = ev?.detail?.key;
      const orientation = run.context.read(TABS_CONTEXT).orientation;
      const list = run.anatomy.partsOf(TABS_FAMILY, 'list')[0] ?? null;
      const focusFirst = list?.getExpose('focusFirst') as (() => void) | null;
      const focusLast = list?.getExpose('focusLast') as (() => void) | null;
      const focusNext = list?.getExpose('focusNext') as (() => void) | null;
      const focusPrev = list?.getExpose('focusPrev') as (() => void) | null;
      if (key === 'Home') {
        focusFirst?.();
        return;
      }
      if (key === 'End') {
        focusLast?.();
        return;
      }
      if (orientation === 'horizontal' && key === 'ArrowRight') {
        focusNext?.();
        return;
      }
      if (orientation === 'horizontal' && key === 'ArrowLeft') {
        focusPrev?.();
        return;
      }
      if (orientation === 'vertical' && key === 'ArrowDown') {
        focusNext?.();
        return;
      }
      if (orientation === 'vertical' && key === 'ArrowUp') {
        focusPrev?.();
      }
    });
  },
});
