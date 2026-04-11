import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { DIALOG_FAMILY } from './shared';
import type {
  DialogDescriptionAsHookContract,
  DialogDescriptionExposes,
  DialogDescriptionProps,
} from './types';

function setupDialogDescription(
  def: DefHandle<DialogDescriptionProps, DialogDescriptionExposes>
): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'description' });
}

export const asDialogDescription = defineAsHook<
  DialogDescriptionProps,
  DialogDescriptionExposes,
  DialogDescriptionAsHookContract
>({
  name: 'as-dialog-description',
  mode: 'once',
  setup: setupDialogDescription,
});

const dialogDescription = definePrototype({
  name: 'base-dialog-description',
  setup: setupDialogDescription,
});

export default dialogDescription;
