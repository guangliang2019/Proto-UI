import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { DIALOG_FAMILY } from './shared';
import type { DialogTitleAsHookContract, DialogTitleExposes, DialogTitleProps } from './types';

function setupDialogTitle(def: DefHandle<DialogTitleProps, DialogTitleExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'title' });
}

export const asDialogTitle = defineAsHook<
  DialogTitleProps,
  DialogTitleExposes,
  DialogTitleAsHookContract
>({
  name: 'as-dialog-title',
  mode: 'once',
  setup: setupDialogTitle,
});

const dialogTitle = definePrototype({
  name: 'base-dialog-title',
  setup: setupDialogTitle,
});

export default dialogTitle;
