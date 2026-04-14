import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asHitParticipation, asOverlay } from '@proto.ui/hooks';
import { asTransition } from '../tools';
import { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
import type { DialogMaskAsHookContract, DialogMaskExposes, DialogMaskProps } from './types';

function setupDialogMask(def: DefHandle<DialogMaskProps, DialogMaskExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'mask' });
  def.props.define({
    passthrough: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    passthrough: false,
  });

  const overlay = asOverlay({
    closeOnEscape: false,
    closeOnOutsidePress: false,
    closeOnFocusOutside: false,
    portal: true,
    modal: true,
    layerRole: 'dialog-mask',
  });
  const hitParticipation = asHitParticipation({
    debugLabel: 'dialog-mask',
    meta: {
      overlayKind: 'dialog-mask',
    },
  });

  const transition = asTransition();
  const controls = transition.controls;
  const open = def.state.bool('open', false);
  let hitRegionDispose: (() => void) | null = null;
  let hitSyncDisposed = false;

  const syncHitParticipation = (run: any) => {
    if (hitSyncDisposed) return;

    let target = run.host?.get?.() ?? null;

    if (!target) {
      try {
        const ownIndex = run.anatomy.order.indexOfSelf(DIALOG_FAMILY, 'mask', { missing: 'null' });
        const ownMask =
          typeof ownIndex === 'number' && ownIndex >= 0
            ? (run.anatomy.partsOf(DIALOG_FAMILY, 'mask')[ownIndex] ?? null)
            : null;
        target = ownMask?.getRootTarget?.() ?? null;
      } catch {
        target = run.host?.get?.() ?? null;
      }
    }

    hitRegionDispose?.();
    hitRegionDispose = null;

    if (!target) return;

    hitRegionDispose = hitParticipation.registerRegion(target, {
      role: 'mask',
      mode: run.props.get().passthrough ? 'passthrough' : 'participating',
      meta: {
        overlayKind: 'dialog-mask',
      },
    });
  };

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
  });

  def.props.watch(['passthrough'], (run) => {
    syncHitParticipation(run);
  });

  overlay.open.watch((_ctx, event) => {
    if (event.type !== 'next') return;
    if (event.next) {
      controls.enter();
    } else {
      controls.leave();
    }
  });

  def.lifecycle.onMounted((run) => {
    hitSyncDisposed = false;
    syncHitParticipation(run);
    queueMicrotask(() => {
      if (hitSyncDisposed) return;
      syncHitParticipation(run);
    });
    updateOpen(open.get(), 'reason: lifecycle.onMounted => dialog mask open sync');
    if (open.get()) {
      controls.enter();
    } else {
      controls.leave();
    }
  });

  def.lifecycle.onUnmounted(() => {
    hitSyncDisposed = true;
    hitRegionDispose?.();
    hitRegionDispose = null;
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
    def.feedback.style.use(tw('fixed inset-0'));
  },
});

export default dialogMask;
