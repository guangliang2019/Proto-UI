import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asCollection } from '@proto.ui/hooks';
import { asOpenState } from '../tools';
import { SELECT_CONTEXT, SELECT_FAMILY } from './shared';
import type { SelectRootAsHookContract, SelectRootExposes, SelectRootProps } from './types';

function setupSelectRoot(def: DefHandle<SelectRootProps, SelectRootExposes>): void {
  def.anatomy.claim(SELECT_FAMILY, { role: 'root' });
  asCollection({ family: SELECT_FAMILY });

  def.props.define({
    value: { type: 'string', empty: 'fallback' },
    defaultValue: { type: 'string', empty: 'fallback' },
    closeOnSelect: { type: 'boolean', empty: 'fallback' },
  } as any);
  def.props.setDefaults({
    defaultValue: '',
    closeOnSelect: true,
  } as any);

  const openState = asOpenState();
  const open = openState.getState?.('open');
  const value = def.state.string('value', '');
  const textValue = def.state.string('textValue', '');
  const activeValue = def.state.string('activeValue', '');
  const updateContext = def.context.provide(SELECT_CONTEXT, {
    open: false,
    controlledOpen: false,
    controlledValue: false,
    disabled: false,
    value: '',
    textValue: '',
    activeValue: '',
    suppressItemNavigation: false,
    closeOnSelect: true,
  });

  let controlledOpen = false;
  let controlledValue = false;
  let disabled = false;
  let closeOnSelect = true;

  const syncContext = () => {
    updateContext((prev) => ({
      ...prev,
      open: open?.get() ?? false,
      controlledOpen,
      controlledValue,
      disabled,
      value: value.get(),
      textValue: textValue.get(),
      activeValue: activeValue.get(),
      closeOnSelect,
    }));
  };

  const resolveTextValue = (run: any, nextValue: string): string => {
    if (!nextValue) return '';
    const items = run.anatomy.partsOf(SELECT_FAMILY, 'item');
    for (const item of items) {
      const snapshot = item.getExpose('getCollectionItem') as
        | (() => Record<string, unknown>)
        | null;
      const current = snapshot?.();
      if (!current || current.value !== nextValue) continue;
      return String(current.textValue ?? current.value ?? '');
    }
    return '';
  };

  def.expose.state('value', value);
  def.expose.state('textValue', textValue);

  def.context.subscribe(SELECT_CONTEXT, (_run, next) => {
    controlledOpen = _run.props.isProvided('open');
    controlledValue = _run.props.isProvided('value');
    disabled = !!_run.props.get().disabled;
    closeOnSelect = !!_run.props.get().closeOnSelect;

    if (!controlledOpen) {
      open?.set(next.open, 'reason: select context sync => open');
    }
    if (!controlledValue) {
      value.set(next.value ?? '', 'reason: select context sync => value');
    }
    textValue.set(next.textValue ?? '', 'reason: select context sync => textValue');
    activeValue.set(next.activeValue ?? '', 'reason: select context sync => activeValue');
  });

  def.lifecycle.onCreated((run) => {
    controlledOpen = run.props.isProvided('open');
    controlledValue = run.props.isProvided('value');
    disabled = !!run.props.get().disabled;
    closeOnSelect = !!run.props.get().closeOnSelect;

    const initialValue = controlledValue
      ? (run.props.get().value ?? '')
      : (run.props.get().defaultValue ?? '');
    const initialOpen = controlledOpen ? !!run.props.get().open : !!run.props.get().defaultOpen;
    value.set(initialValue, 'reason: lifecycle.onCreated => initialize select value');
    textValue.set('', 'reason: lifecycle.onCreated => initialize select textValue');
    activeValue.set(
      initialOpen ? initialValue : '',
      'reason: lifecycle.onCreated => initialize select activeValue'
    );
    syncContext();
  });

  def.lifecycle.onMounted((run) => {
    const resolved = resolveTextValue(run, value.get());
    if (resolved !== textValue.get()) {
      textValue.set(resolved, 'reason: lifecycle.onMounted => resolve selected text');
    }
    syncContext();
  });

  def.props.watch(['value', 'closeOnSelect'], (run, next) => {
    controlledOpen = run.props.isProvided('open');
    controlledValue = run.props.isProvided('value');
    disabled = !!run.props.get().disabled;
    closeOnSelect = !!next.closeOnSelect;

    if (controlledValue) {
      const nextValue = next.value ?? '';
      value.set(nextValue, 'reason: props.watch(value) => controlled select sync');
      textValue.set(resolveTextValue(run, nextValue), 'reason: props.watch(value) => text sync');
      if (open?.get()) {
        activeValue.set(nextValue, 'reason: props.watch(value) => active sync');
      }
    }

    syncContext();
  });

  open?.watch((_run, event) => {
    if (event.type !== 'next') return;
    if (!event.next) {
      activeValue.set('', 'reason: select closed => reset activeValue');
    } else if (!activeValue.get()) {
      activeValue.set(value.get(), 'reason: select opened => seed activeValue from selected value');
    }
    syncContext();
  });
}

export const asSelectRoot = defineAsHook<
  SelectRootProps,
  SelectRootExposes,
  SelectRootAsHookContract
>({
  name: 'as-select-root',
  mode: 'once',
  setup: setupSelectRoot,
});

const selectRoot = definePrototype({
  name: 'base-select-root',
  setup: setupSelectRoot,
});

export default selectRoot;
