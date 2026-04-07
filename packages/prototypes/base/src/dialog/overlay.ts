import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asOverlay } from '@proto.ui/hooks';
import { asTransition } from '../tools';
import { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
import type { DialogMaskAsHookContract, DialogMaskExposes, DialogMaskProps } from './types';

function setupDialogMask(def: DefHandle<DialogMaskProps, DialogMaskExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'mask' });

  const overlay = asOverlay({
    closeOnEscape: false,
    closeOnOutsidePress: false,
    closeOnFocusOutside: false,
    portal: true,
    modal: true,
  });

  const transition = asTransition();
  const controls = transition.controls;
  const open = def.state.bool('open', false);

  def.context.subscribe(DIALOG_CONTEXT, (_run, next) => {
    open.set(next.open, 'reason: dialog context sync => mask open');
    if (next.open) {
      controls.enter();
    } else {
      controls.leave();
    }
  });

  def.rule({
    when: (w: any) => w.state(open).eq(false),
    intent: (i: any) => i.feedback.style.use(tw('hidden')),
  });
}

export const asDialogMask = defineAsHook<
  DialogMaskProps,
  DialogMaskExposes,
  DialogMaskAsHookContract
>({
  name: 'as-dialog-mask',
  mode: 'once',
  setup: setupDialogMask,
});

const dialogMask = definePrototype({
  name: 'base-dialog-mask',
  setup(def) {
    setupDialogMask(def);
    def.feedback.style.use(tw('fixed inset-0 z-50'));
  },
});

export default dialogMask;
