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

  const updateOpen = (nextOpen: boolean, reason?: string) => {
    open.set(nextOpen, reason ?? 'reason: dialog mask sync => open');
    if (nextOpen) {
      overlay.openOverlay(reason ?? 'dialog.open');
    } else {
      overlay.close(reason ?? 'dialog.close');
    }
  };

  def.context.subscribe(DIALOG_CONTEXT, (_run, next) => {
    updateOpen(next.open, 'reason: dialog context sync => mask open');
    if (next.open) {
      controls.enter();
    } else {
      controls.leave();
    }
  });

  def.lifecycle.onMounted(() => {
    updateOpen(open.get(), 'reason: lifecycle.onMounted => dialog mask open sync');
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
