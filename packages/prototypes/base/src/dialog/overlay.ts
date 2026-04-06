import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asTransition } from '../tools';
import { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
import { createBodyPortal } from './portal';
import type {
  DialogOverlayAsHookContract,
  DialogOverlayExposes,
  DialogOverlayProps,
} from './types';

function setupDialogOverlay(def: DefHandle<DialogOverlayProps, DialogOverlayExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'overlay' });

  const transition = asTransition();
  const controls = transition.controls;
  const open = def.state.bool('open', false);
  const portal = createBodyPortal();

  def.context.subscribe(DIALOG_CONTEXT, (_run, next) => {
    open.set(next.open, 'reason: dialog context sync => overlay open');
    if (next.open) {
      controls.enter();
    } else {
      controls.leave();
    }
  });

  def.lifecycle.onMounted((run) => {
    const host = run.host?.get?.();
    if (host instanceof HTMLElement) {
      portal.mount(host);
    }
  });

  def.lifecycle.onUnmounted(() => {
    portal.unmount();
  });

  def.rule({
    when: (w: any) => w.state(open).eq(false),
    intent: (i: any) => i.feedback.style.use(tw('hidden')),
  });
}

export const asDialogOverlay = defineAsHook<
  DialogOverlayProps,
  DialogOverlayExposes,
  DialogOverlayAsHookContract
>({
  name: 'as-dialog-overlay',
  mode: 'once',
  setup: setupDialogOverlay,
});

const dialogOverlay = definePrototype({
  name: 'base-dialog-overlay',
  setup(def) {
    setupDialogOverlay(def);
    def.feedback.style.use(tw('fixed inset-0 z-50'));
  },
});

export default dialogOverlay;
