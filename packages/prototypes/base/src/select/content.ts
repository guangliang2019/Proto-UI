import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asFocusGroup, asOverlay } from '@proto.ui/hooks';
import { asFocusRoving } from '../behaviors';
import { SELECT_CONTEXT, SELECT_FAMILY, SELECT_FOCUS_GROUP } from './shared';
import type {
  SelectContentAsHookContract,
  SelectContentExposes,
  SelectContentProps,
} from './types';

function setupSelectContent(def: DefHandle<SelectContentProps, SelectContentExposes>): void {
  def.anatomy.claim(SELECT_FAMILY, { role: 'content' });
  let activeValue = '';
  let selectedValue = '';
  asFocusGroup({
    key: SELECT_FOCUS_GROUP,
    navigation: 'none',
    orientation: 'vertical',
    entry: 'manual',
  });
  const roving = asFocusRoving({
    family: SELECT_FAMILY,
    itemRole: 'item',
    loop: false,
    skipDisabled: true,
    getId: (snapshot) => {
      const value = snapshot.value;
      return typeof value === 'string' && value ? value : null;
    },
    getActiveId: () => activeValue,
    getCurrentId: () => selectedValue,
    exposeFocusCurrentMethodKey: 'focusSelected',
  });
  const focusById = roving.getMethod?.('focusById') as
    | ((id: string, options?: { reason?: 'programmatic' | 'keyboard' | 'pointer' }) => boolean)
    | undefined;
  const focusFirst = roving.getMethod?.('focusFirst') as (() => boolean) | undefined;
  const focusLast = roving.getMethod?.('focusLast') as (() => boolean) | undefined;
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

  const resolveBoundaryValue = (run: any, boundary: 'first' | 'last' = 'first') => {
    const items = run.anatomy.partsOf(SELECT_FAMILY, 'item');
    const ordered = boundary === 'first' ? items : items.slice().reverse();
    for (const item of ordered) {
      const snapshot = (
        item.getExpose('getCollectionItem') as (() => Record<string, unknown>) | null
      )?.();
      if (!snapshot || snapshot.disabled) continue;
      const value = snapshot.value;
      if (typeof value === 'string' && value) return value;
    }
    return '';
  };

  const resolveOpenFocusAction = (run: any, ctx: { activeValue?: string; value?: string }) => {
    if (focusById?.(ctx.activeValue ?? '', { reason: 'keyboard' })) return;
    if (focusById?.(ctx.value ?? '', { reason: 'keyboard' })) return;
    const boundaryValue = resolveBoundaryValue(run, 'first');
    if (boundaryValue) {
      if (!(ctx.activeValue ?? '') && !(ctx.value ?? '')) {
        run.context.update(SELECT_CONTEXT, (prev: any) => ({
          ...prev,
          activeValue: boundaryValue,
        }));
      }
      focusById?.(boundaryValue, { reason: 'keyboard' });
      return;
    }
    focusFirst?.();
  };

  const focusSelectedOrBoundary = (run: any, boundary: 'first' | 'last' = 'first') => {
    if (focusById?.(run.context.read(SELECT_CONTEXT).value ?? '', { reason: 'keyboard' })) {
      return true;
    }
    if (boundary === 'last') {
      focusLast?.();
      return false;
    }
    focusFirst?.();
    return false;
  };

  def.expose.state('open', open);

  def.context.subscribe(SELECT_CONTEXT, (run, next) => {
    activeValue = next.activeValue ?? '';
    selectedValue = next.value ?? '';
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
    activeValue = ctx.activeValue ?? '';
    selectedValue = ctx.value ?? '';
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
        activeValue = '';
        mountedRun.context.update(SELECT_CONTEXT, (prev: any) => ({
          ...prev,
          open: false,
          activeValue: '',
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
    activeValue = '';
    run.context.update(SELECT_CONTEXT, (prev: any) => ({
      ...prev,
      open: false,
      activeValue: '',
    }));
  });

  def.rule({
    when: (w: any) => w.state(open).eq(false),
    intent: (i: any) => i.feedback.style.use(tw('hidden')),
  });

  def.lifecycle.onUnmounted(() => {
    mountedRun = null;
    activeValue = '';
    selectedValue = '';
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
