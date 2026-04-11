import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asFocusGroup, asOverlay } from '@proto.ui/hooks';
import { SELECT_CONTEXT, SELECT_FAMILY, SELECT_FOCUS_GROUP } from './shared';
import type {
  SelectContentAsHookContract,
  SelectContentExposes,
  SelectContentProps,
} from './types';

function setupSelectContent(def: DefHandle<SelectContentProps, SelectContentExposes>): void {
  def.anatomy.claim(SELECT_FAMILY, { role: 'content' });
  asFocusGroup({
    key: SELECT_FOCUS_GROUP,
    navigation: 'arrow',
    orientation: 'vertical',
    entry: 'first',
  });
  const group = asFocusGroup();
  const overlay = asOverlay({
    restore: 'trigger',
    entry: 'content',
  });
  const open = def.state.bool('open', false);
  let mountedRun: any = null;

  const restoreTriggerFocus = (run: any) => {
    const trigger = run.anatomy.partsOf(SELECT_FAMILY, 'trigger')[0] ?? null;
    const focusSelf = trigger?.getExpose('focusSelf') as
      | ((options?: { reason?: 'programmatic' | 'keyboard' | 'pointer' }) => void)
      | null;
    focusSelf?.({ reason: 'programmatic' });
  };

  const focusItemByValue = (run: any, value: string): boolean => {
    if (!value) return false;
    const items = run.anatomy.partsOf(SELECT_FAMILY, 'item');
    for (const item of items) {
      const snapshot = item.getExpose('getCollectionItem') as
        | (() => Record<string, unknown>)
        | null;
      const focusSelf = item.getExpose('focusSelf') as
        | ((options?: { reason?: 'programmatic' | 'keyboard' | 'pointer' }) => void)
        | null;
      const next = snapshot?.();
      if (!next || next.value !== value || next.disabled) continue;
      focusSelf?.({ reason: 'keyboard' });
      return true;
    }
    return false;
  };

  const resolveOpenFocusAction = (run: any, ctx: { activeValue?: string; value?: string }) => {
    if (focusItemByValue(run, ctx.activeValue ?? '')) return;
    if (focusItemByValue(run, ctx.value ?? '')) return;
    group.focusFirst();
  };

  const focusSelectedOrBoundary = (run: any, boundary: 'first' | 'last' = 'first') => {
    if (focusItemByValue(run, run.context.read(SELECT_CONTEXT).value ?? '')) return true;
    if (boundary === 'last') {
      group.focusLast();
      return false;
    }
    group.focusFirst();
    return false;
  };

  def.expose.state('open', open);
  def.expose.method('focusFirst', () => group.focusFirst());
  def.expose.method('focusLast', () => group.focusLast());
  def.expose.method('focusNext', () => group.focusNext());
  def.expose.method('focusPrev', () => group.focusPrev());
  def.expose.method('focusSelected', () => {
    group.focusSelected();
  });

  def.context.subscribe(SELECT_CONTEXT, (run, next) => {
    open.set(next.open, 'reason: select context sync => content open');
    if (next.open) {
      overlay.openOverlay('controlled.sync');
      resolveOpenFocusAction(run, next);
      return;
    }
    overlay.close('controlled.sync');
  });

  def.lifecycle.onMounted((run) => {
    mountedRun = run;
    const ctx = run.context.read(SELECT_CONTEXT);
    open.set(ctx.open, 'reason: lifecycle.onMounted => content open sync');
    if (ctx.open) {
      overlay.openOverlay('controlled.sync');
      resolveOpenFocusAction(run, ctx);
    } else {
      overlay.close('controlled.sync');
    }
  });

  overlay.open.watch((run, event) => {
    if (event.type !== 'next') return;
    const ctx = mountedRun?.context.read(SELECT_CONTEXT);
    if (!ctx) return;
    if (!event.next) {
      restoreTriggerFocus(mountedRun);
      if (!ctx.controlledOpen) {
        mountedRun.context.update(SELECT_CONTEXT, (prev: any) => ({
          ...prev,
          open: false,
          activeValue: '',
          suppressItemNavigation: false,
        }));
      }
      return;
    }

    if (!ctx.controlledOpen && !ctx.open) {
      mountedRun.context.update(SELECT_CONTEXT, (prev: any) => ({
        ...prev,
        open: true,
        activeValue: prev.value,
      }));
    }
  });

  def.event.onGlobal('key.down', (run, ev) => {
    const ctx = run.context.read(SELECT_CONTEXT);
    if (!ctx.open || ctx.disabled) return;
    if (ev?.detail?.key !== 'Escape') return;
    if (ctx.controlledOpen) return;
    run.context.update(SELECT_CONTEXT, (prev: any) => ({
      ...prev,
      open: false,
      activeValue: '',
      suppressItemNavigation: false,
    }));
  });

  def.rule({
    when: (w: any) => w.state(open).eq(false),
    intent: (i: any) => i.feedback.style.use(tw('hidden')),
  });

  def.lifecycle.onUnmounted(() => {
    mountedRun = null;
  });
}

export const asSelectContent = defineAsHook<
  SelectContentProps,
  SelectContentExposes,
  SelectContentAsHookContract
>({
  name: 'as-select-content',
  mode: 'once',
  setup: setupSelectContent,
});

const selectContent = definePrototype({
  name: 'base-select-content',
  setup: setupSelectContent,
});

export default selectContent;
