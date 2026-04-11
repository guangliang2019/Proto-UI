import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asOpenState } from '../tools';
import { DIALOG_CONTEXT, DIALOG_FAMILY, type DialogContextValue } from './shared';
import type { DialogRootAsHookContract, DialogRootExposes, DialogRootProps } from './types';

function sameContext(a: DialogContextValue, b: DialogContextValue): boolean {
  return (
    a.open === b.open &&
    a.controlled === b.controlled &&
    a.disabled === b.disabled &&
    a.alert === b.alert
  );
}

function setupDialogRoot(def: DefHandle<DialogRootProps, DialogRootExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'root' });

  def.props.define({
    open: { type: 'boolean', empty: 'fallback' },
    defaultOpen: { type: 'boolean', empty: 'fallback' },
    disabled: { type: 'boolean', empty: 'fallback' },
    alert: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    defaultOpen: false,
    disabled: false,
    alert: false,
  });

  const updateContext = def.context.provide(DIALOG_CONTEXT, {
    open: false,
    controlled: false,
    disabled: false,
    alert: false,
  });

  const openState = asOpenState({
    exposeOpenMethodKey: 'openDialog',
  });
  const open = openState.getState?.('open');

  const initialContext: DialogContextValue = {
    open: false,
    controlled: false,
    disabled: false,
    alert: false,
  };
  let snapshot: DialogContextValue = initialContext;
  let published: DialogContextValue = initialContext;

  const syncContext = () => {
    const next = {
      ...snapshot,
      open: open?.get() ?? false,
    };
    snapshot = next;
    if (sameContext(published, next)) return;
    published = next;
    updateContext(next);
  };

  def.context.subscribe(DIALOG_CONTEXT, (_run, next) => {
    snapshot = next;
    published = next;
    if (!snapshot.controlled) {
      open?.set(next.open, 'reason: dialog context sync => open');
    }
  });

  def.lifecycle.onCreated((run) => {
    snapshot = {
      ...snapshot,
      controlled: run.props.isProvided('open'),
      disabled: !!run.props.get().disabled,
      alert: !!run.props.get().alert,
    };
    syncContext();
  });

  def.props.watch(['open', 'disabled', 'alert'], (run, next) => {
    snapshot = {
      ...snapshot,
      controlled: run.props.isProvided('open'),
      disabled: !!next.disabled,
      alert: !!next.alert,
    };
    syncContext();
  });

  open?.watch((_run, event) => {
    if (event.type !== 'next') return;
    syncContext();
  });
}

export const asDialogRoot = defineAsHook<
  DialogRootProps,
  DialogRootExposes,
  DialogRootAsHookContract
>({
  name: 'as-dialog-root',
  mode: 'once',
  setup: setupDialogRoot,
});

const dialogRoot = definePrototype({
  name: 'base-dialog-root',
  setup(def) {
    setupDialogRoot(def);
  },
});

export default dialogRoot;
