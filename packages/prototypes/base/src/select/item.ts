import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asCollectionItem, asFocusable } from '@proto.ui/hooks';
import { asButton } from '../button';
import { SELECT_CONTEXT, SELECT_FAMILY, SELECT_FOCUS_GROUP } from './shared';
import type { SelectItemAsHookContract, SelectItemExposes, SelectItemProps } from './types';

function syncBoolState(
  currentValue: string,
  ownValue: string,
  state: { set(value: boolean, reason?: string): void },
  reason: string
) {
  state.set(!!ownValue && ownValue === currentValue, reason);
}

function setupSelectItem(def: DefHandle<SelectItemProps, SelectItemExposes>): void {
  asButton();
  const focusable = asFocusable({ groupKey: SELECT_FOCUS_GROUP });
  const active = def.state.bool('active', false);
  const selected = def.state.fromAccessibility('selected');

  asCollectionItem({
    family: SELECT_FAMILY,
    getMeta: (run) => {
      const props = run.props.get();
      return {
        value: props.value ?? '',
        textValue: props.textValue ?? '',
        disabled: !!props.disabled,
      };
    },
  });

  def.props.define({
    disabled: { type: 'boolean', empty: 'fallback' },
    value: { type: 'string', empty: 'fallback' },
    textValue: { type: 'string', empty: 'fallback' },
    closeOnSelect: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    disabled: false,
    value: '',
    textValue: '',
  });

  let ownValue = '';
  let ownTextValue = '';
  def.expose.state('active', active);
  def.expose.state('selected', selected);

  const publishSelectedText = (run: any) => {
    const ctx = run.context.read(SELECT_CONTEXT);
    if (!ownValue || ctx.value !== ownValue) return;
    const nextTextValue = ownTextValue || ownValue;
    if (ctx.textValue === nextTextValue) return;
    run.context.update(SELECT_CONTEXT, (prev: any) => {
      if (prev.value !== ownValue || prev.textValue === nextTextValue) return prev;
      return { ...prev, textValue: nextTextValue };
    });
  };

  const syncFromContext = (ctx: { value?: string; activeValue?: string }) => {
    syncBoolState(ctx.value ?? '', ownValue, selected, 'reason: select context sync => selected');
    syncBoolState(ctx.activeValue ?? '', ownValue, active, 'reason: select context sync => active');
  };

  def.context.subscribe(SELECT_CONTEXT, (run, next) => {
    syncFromContext(next);
    publishSelectedText(run);
  });

  def.lifecycle.onMounted((run) => {
    ownValue = run.props.get().value ?? '';
    ownTextValue = run.props.get().textValue ?? '';
    syncFromContext(run.context.read(SELECT_CONTEXT));
    publishSelectedText(run);
  });

  def.props.watch(['value', 'textValue'], (run, next) => {
    ownValue = next.value ?? '';
    ownTextValue = next.textValue ?? '';
    syncFromContext(run.context.read(SELECT_CONTEXT));
    publishSelectedText(run);
  });

  const updateActiveValue = (run: any) => {
    if (!ownValue) return;
    run.context.update(SELECT_CONTEXT, (prev: any) => {
      if (prev.activeValue === ownValue) return prev;
      return { ...prev, activeValue: ownValue };
    });
  };

  def.event.on('press.commit', (run) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled) return;

    updateActiveValue(run);

    if (!ctx.controlledValue) {
      run.context.update(SELECT_CONTEXT, (prev: any) => ({
        ...prev,
        value: ownValue,
        textValue: ownTextValue || ownValue,
      }));
    }

    const closeOnSelect = run.props.isProvided('closeOnSelect')
      ? !!run.props.get().closeOnSelect
      : !!ctx.closeOnSelect;
    if (!closeOnSelect || ctx.controlledOpen) return;

    run.context.update(SELECT_CONTEXT, (prev: any) => ({
      ...prev,
      open: false,
      suppressItemNavigation: false,
    }));
  });

  def.event.on('native:focus', (run) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled) return;
    updateActiveValue(run);
  });

  def.event.on('pointer.enter', (run) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled || !ctx.open) return;
    updateActiveValue(run);
  });

  def.event.onGlobal('key.down', (run, ev) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(SELECT_CONTEXT);
    if (ownDisabled || ctx.disabled) return;
    if (!focusable.isFocused()) return;

    if (ctx.suppressItemNavigation) {
      run.context.update(SELECT_CONTEXT, (prev: any) => ({
        ...prev,
        suppressItemNavigation: false,
      }));
      return;
    }

    const key = ev?.detail?.key;
    const content = run.anatomy.partsOf(SELECT_FAMILY, 'content')[0] ?? null;
    const focusFirst = content?.getExpose('focusFirst') as (() => void) | null;
    const focusLast = content?.getExpose('focusLast') as (() => void) | null;
    const focusNext = content?.getExpose('focusNext') as (() => void) | null;
    const focusPrev = content?.getExpose('focusPrev') as (() => void) | null;

    if (key === 'Home') {
      ev?.detail?.preventDefault?.();
      ev?.detail?.stopPropagation?.();
      queueMicrotask(() => {
        focusFirst?.();
      });
      return;
    }
    if (key === 'End') {
      ev?.detail?.preventDefault?.();
      ev?.detail?.stopPropagation?.();
      queueMicrotask(() => {
        focusLast?.();
      });
      return;
    }
    if (key === 'ArrowDown') {
      ev?.detail?.preventDefault?.();
      ev?.detail?.stopPropagation?.();
      queueMicrotask(() => {
        focusNext?.();
      });
      return;
    }
    if (key === 'ArrowUp') {
      ev?.detail?.preventDefault?.();
      ev?.detail?.stopPropagation?.();
      queueMicrotask(() => {
        focusPrev?.();
      });
    }
  });
}

export const asSelectItem = defineAsHook<
  SelectItemProps,
  SelectItemExposes,
  SelectItemAsHookContract
>({
  name: 'as-select-item',
  mode: 'once',
  setup: setupSelectItem,
});

const selectItem = definePrototype({
  name: 'base-select-item',
  setup: setupSelectItem,
});

export default selectItem;
