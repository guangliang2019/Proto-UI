import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asButton } from '../button';
import { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
import type {
  DialogTriggerAsHookContract,
  DialogTriggerExposes,
  DialogTriggerProps,
} from './types';

function setupDialogTrigger(def: DefHandle<DialogTriggerProps, DialogTriggerExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'trigger' });
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
      open: !prev.open,
    }));
  });
}

export const asDialogTrigger = defineAsHook<
  DialogTriggerProps,
  DialogTriggerExposes,
  DialogTriggerAsHookContract
>({
  name: 'as-dialog-trigger',
  mode: 'once',
  setup: setupDialogTrigger,
});

const dialogTrigger = definePrototype({
  name: 'base-dialog-trigger',
  setup: setupDialogTrigger,
});

export default dialogTrigger;
