import { asFocusGroup, asOverlay, defineAsHook, tw } from '@proto.ui/core';
import {
  DROPDOWN_CONTEXT,
  DROPDOWN_FAMILY,
  DROPDOWN_FOCUS_GROUP,
  registerDropdownFamily,
} from './shared';
import type {
  DropdownContentAsHookContract,
  DropdownContentExposes,
  DropdownContentProps,
} from './types';

export const asDropdownContent = defineAsHook<
  DropdownContentProps,
  DropdownContentExposes,
  DropdownContentAsHookContract
>({
  name: 'as-dropdown-content',
  mode: 'once',
  setup(def, _options, api) {
    registerDropdownFamily(def as any);
    def.anatomy.claim(DROPDOWN_FAMILY, { role: 'content' });
    asFocusGroup({
      key: DROPDOWN_FOCUS_GROUP,
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
    api.store.typeahead = '';
    api.store.typeaheadTimer = null as ReturnType<typeof setTimeout> | null;
    api.store.run = null as any;

    const clearTypeahead = () => {
      if (api.store.typeaheadTimer) {
        clearTimeout(api.store.typeaheadTimer);
        api.store.typeaheadTimer = null;
      }
      api.store.typeahead = '';
    };

    const focusItemByValue = (run: any, value: string): boolean => {
      if (!value) return false;
      const items = run.anatomy.partsOf(DROPDOWN_FAMILY, 'item');
      for (const item of items) {
        const snapshot = item.getExpose('getCollectionItem') as
          | (() => Record<string, unknown>)
          | null;
        const focusSelf = item.getExpose('focusSelf') as (() => void) | null;
        const next = snapshot?.();
        if (!next || next.value !== value || next.disabled) continue;
        focusSelf?.();
        return true;
      }
      return false;
    };

    const resolveOpenFocusAction = (
      run: any,
      ctx: { activeValue?: string; openEntry?: string; openEntryValue?: string }
    ) => {
      if (ctx.openEntry === 'value-or-first' && focusItemByValue(run, ctx.openEntryValue ?? '')) {
        return;
      }
      if (ctx.openEntry !== 'first' && focusItemByValue(run, ctx.activeValue ?? '')) {
        return;
      }
      group.focusFirst();
    };

    def.expose.state('open', open);
    def.expose.method('focusFirst', () => group.focusFirst());
    def.expose.method('focusLast', () => group.focusLast());
    def.expose.method('focusNext', () => group.focusNext());
    def.expose.method('focusPrev', () => group.focusPrev());
    def.context.subscribe(DROPDOWN_CONTEXT, (_run, next) => {
      open.set(next.open, 'reason: dropdown context sync => content open');
      if (next.open) {
        overlay.openOverlay('controlled.sync');
        resolveOpenFocusAction(_run, next);
        return;
      }
      clearTypeahead();
      overlay.close('controlled.sync');
    });

    def.lifecycle.onMounted((run) => {
      api.store.run = run;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      open.set(ctx.open, 'reason: lifecycle.onMounted => content open sync');
      if (ctx.open) {
        overlay.openOverlay('controlled.sync');
        resolveOpenFocusAction(run, ctx);
      } else {
        overlay.close('controlled.sync');
      }
    });

    overlay.open.watch((_ctx, event) => {
      if (event.type !== 'next') return;
      const run = api.store.run;
      if (!run) return;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (event.next) {
        if (!ctx.controlled && !ctx.open) {
          run.context.update(DROPDOWN_CONTEXT, (prev) => ({ ...prev, open: true }));
        }
        return;
      }
      if (ctx.controlled) return;
      run.context.update(DROPDOWN_CONTEXT, (prev) => ({
        ...prev,
        open: false,
        activeValue: '',
        suppressItemNavigation: false,
      }));
    });

    def.event.onGlobal('key.down', (run, ev) => {
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (!ctx.open || ctx.disabled) return;

      const key = ev?.detail?.key;
      if (key === 'Escape') {
        if (ctx.controlled) return;
        run.context.update(DROPDOWN_CONTEXT, (prev) => ({
          ...prev,
          open: false,
          activeValue: '',
          suppressItemNavigation: false,
        }));
        return;
      }
      if (typeof key !== 'string' || key.length !== 1) return;
      if (ev?.detail?.ctrlKey || ev?.detail?.metaKey || ev?.detail?.altKey) return;

      const nextBuffer = `${api.store.typeahead}${key}`.toLowerCase();
      api.store.typeahead = nextBuffer;
      if (api.store.typeaheadTimer) {
        clearTimeout(api.store.typeaheadTimer);
      }
      api.store.typeaheadTimer = setTimeout(() => {
        api.store.typeahead = '';
        api.store.typeaheadTimer = null;
      }, 400);

      const items = run.anatomy.partsOf(DROPDOWN_FAMILY, 'item');
      const snapshots = items
        .map((item) => ({
          focusSelf: item.getExpose('focusSelf') as (() => void) | null,
          snapshot: (
            item.getExpose('getCollectionItem') as (() => Record<string, unknown>) | null
          )?.(),
        }))
        .filter((entry) => entry.snapshot && !entry.snapshot.disabled);
      if (snapshots.length === 0) return;

      const startIndex = Math.max(
        snapshots.findIndex((entry) => entry.snapshot?.value === ctx.activeValue),
        -1
      );
      const findMatch = (buffer: string) => {
        for (let step = 1; step <= snapshots.length; step++) {
          const entry = snapshots[(startIndex + step) % snapshots.length]!;
          const label = String(
            entry.snapshot?.textValue || entry.snapshot?.value || ''
          ).toLowerCase();
          if (!label.startsWith(buffer)) continue;
          return entry;
        }
        return null;
      };

      const match = findMatch(nextBuffer) ?? findMatch(String(key).toLowerCase());
      if (!match) return;
      queueMicrotask(() => {
        match.focusSelf?.();
      });
    });

    def.lifecycle.onUnmounted(() => {
      clearTypeahead();
      api.store.run = null;
    });

    def.rule({
      when: (w: any) => w.state(open).eq(false),
      intent: (i: any) => i.feedback.style.use(tw('hidden')),
    });
  },
});
