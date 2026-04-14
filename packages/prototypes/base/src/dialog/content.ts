import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asBoundary, asFocusScope, asOverlay } from '@proto.ui/hooks';
import { asTransition } from '../tools';
import { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
import type {
  DialogContentAsHookContract,
  DialogContentExposes,
  DialogContentProps,
} from './types';

function setupDialogContent(def: DefHandle<DialogContentProps, DialogContentExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'content' });

  def.props.define({
    alert: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    alert: false,
  });

  const alertProp = def.state.bool('alert', false);

  const overlay = asOverlay({
    closeOnEscape: true,
    closeOnOutsidePress: false,
    closeOnFocusOutside: true,
    restore: 'trigger',
    entry: 'content',
    placement: 'center',
    portal: true,
    modal: false,
    layerRole: 'dialog-content',
  });
  const boundary = asBoundary();

  const focusScope = asFocusScope({ trap: true });

  const transition = asTransition();
  const controls = transition.controls;

  const open = def.state.bool('open', false);
  def.expose.state('open', open);

  let mountedRun: any = null;

  const updateOpen = (nextOpen: boolean, reason?: string) => {
    open.set(nextOpen, reason ?? 'reason: dialog content sync => open');
    if (nextOpen) {
      overlay.openOverlay(reason ?? 'dialog.open');
    } else {
      overlay.close(reason ?? 'dialog.close');
    }
  };

  const syncAlert = (run: any) => {
    const alert = !!run.props.get().alert;
    alertProp.set(alert, 'reason: dialog alert sync');
  };

  def.context.subscribe(DIALOG_CONTEXT, (run, next) => {
    syncAlert(run);
    updateOpen(next.open, 'reason: dialog context sync => content');
  });

  def.lifecycle.onMounted((run) => {
    mountedRun = run;
    const trigger = run.anatomy.partsOf(DIALOG_FAMILY, 'trigger', { missing: 'empty' })[0] ?? null;
    const triggerTarget = trigger?.getRootTarget?.() ?? null;
    if (triggerTarget) {
      overlay.registerTrigger(triggerTarget);
    }
    syncAlert(run);
    const ctx = run.context.read(DIALOG_CONTEXT);
    updateOpen(ctx.open, 'reason: lifecycle.onMounted => dialog content open sync');
    if (ctx.open) {
      controls.enter();
    } else {
      controls.leave();
    }
  });

  def.lifecycle.onUnmounted(() => {
    mountedRun = null;
  });

  overlay.open.watch((_ctx, event) => {
    if (event.type !== 'next') return;
    if (event.next) {
      controls.enter();
    } else {
      controls.leave();
      const run = mountedRun;
      if (!run) return;
      const ctx = run.context.read(DIALOG_CONTEXT);
      if (ctx.controlled) return;
      run.context.update(DIALOG_CONTEXT, (prev: any) => ({ ...prev, open: false }));
    }
  });

  def.event.onGlobal('native:pointerdown', (run, ev) => {
    const ctx = run.context.read(DIALOG_CONTEXT);
    if (!ctx.open) return;
    if (alertProp.get()) return;

    const classification = boundary.notify({
      type: 'pointerdown',
      target: ev?.target,
      nativeEvent: ev,
    });
    if (classification !== 'outside') return;

    if (ctx.controlled) {
      overlay.close('outside.press');
      controls.leave();
      return;
    }
    run.context.update(DIALOG_CONTEXT, (prev) => ({ ...prev, open: false }));
  });

  def.event.onGlobal('key.down', (run, ev) => {
    const ctx = run.context.read(DIALOG_CONTEXT);
    if (!ctx.open) return;
    const key = ev?.detail?.key;
    if (key !== 'Escape') return;

    if (ctx.controlled) {
      overlay.close('escape');
      controls.leave();
      return;
    }
    run.context.update(DIALOG_CONTEXT, (prev) => ({ ...prev, open: false }));
  });

  def.rule({
    when: (w: any) => w.state(open).eq(false),
    intent: (i: any) => i.feedback.style.use(tw('hidden')),
  });
}

export const asDialogContent = defineAsHook<
  DialogContentProps,
  DialogContentExposes,
  DialogContentAsHookContract
>({
  name: 'as-dialog-content',
  mode: 'once',
  setup: setupDialogContent,
});

const dialogContent = definePrototype({
  name: 'base-dialog-content',
  setup(def) {
    setupDialogContent(def);
    def.feedback.style.use(tw('fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'));
  },
});

export default dialogContent;
