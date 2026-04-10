import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asButton } from '../button';
import { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
import type { DialogCloseAsHookContract, DialogCloseExposes, DialogCloseProps } from './types';

function setupDialogClose(def: DefHandle<DialogCloseProps, DialogCloseExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'close' });
  asButton();

  def.props.define({
    disabled: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    disabled: false,
  });

  def.context.subscribe(DIALOG_CONTEXT);

  def.event.on('press.commit', (run) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(DIALOG_CONTEXT);
    if (ownDisabled || ctx.disabled) return;
    if (ctx.controlled) return;
    run.context.update(DIALOG_CONTEXT, (prev) => ({
      ...prev,
      open: false,
    }));
  });
}

export const asDialogClose = defineAsHook<
  DialogCloseProps,
  DialogCloseExposes,
  DialogCloseAsHookContract
>({
  name: 'as-dialog-close',
  mode: 'once',
  setup: setupDialogClose,
});

const dialogClose = definePrototype({
  name: 'base-dialog-close',
  setup: setupDialogClose,
});

export default dialogClose;
