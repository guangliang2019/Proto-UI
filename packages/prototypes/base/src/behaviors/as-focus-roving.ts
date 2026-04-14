import { defineHook } from '@proto.ui/core';
import type { AnatomyFamily, ExposeMethod, RunHandle } from '@proto.ui/core';
import type { PropsBaseType } from '@proto.ui/types';

type FocusReason = 'programmatic' | 'keyboard' | 'pointer';

type FocusRovingItemSnapshot = Readonly<Record<string, unknown> & { disabled?: boolean }>;

type FocusRovingEntry = {
  id: string;
  disabled: boolean;
  focusSelf: ((options?: { reason?: FocusReason }) => void) | null;
};

export type FocusRovingOptions<P extends PropsBaseType = any> = {
  family: AnatomyFamily;
  itemRole?: string;
  loop?: boolean;
  skipDisabled?: boolean;
  snapshotMethodKey?: string;
  focusMethodKey?: string;
  getId?: (snapshot: FocusRovingItemSnapshot, index: number) => string | null | undefined;
  getActiveId?: (run: RunHandle<P>) => string | null | undefined;
  getCurrentId?: (run: RunHandle<P>) => string | null | undefined;
  exposeFocusFirstMethodKey?: string;
  exposeFocusLastMethodKey?: string;
  exposeFocusNextMethodKey?: string;
  exposeFocusPrevMethodKey?: string;
  exposeFocusByIdMethodKey?: string;
  exposeFocusCurrentMethodKey?: string;
};

export type FocusRovingExposes = {
  focusFirst: ExposeMethod<() => boolean>;
  focusLast: ExposeMethod<() => boolean>;
  focusNext: ExposeMethod<() => boolean>;
  focusPrev: ExposeMethod<() => boolean>;
  focusById: ExposeMethod<(id: string, options?: { reason?: FocusReason }) => boolean>;
  focusCurrent: ExposeMethod<() => boolean>;
};

const DEFAULT_ITEM_ROLE = 'item';
const DEFAULT_SNAPSHOT_METHOD_KEY = 'getCollectionItem';
const DEFAULT_FOCUS_METHOD_KEY = 'focusSelf';

function readSnapshot(part: { getExpose(key: string): unknown | null }, key: string) {
  const value = part.getExpose(key);
  if (typeof value !== 'function') return {} as FocusRovingItemSnapshot;
  const next = value();
  return next && typeof next === 'object' ? (next as FocusRovingItemSnapshot) : {};
}

export const asFocusRoving = defineHook<any, FocusRovingExposes, {}, FocusRovingOptions<any>>({
  name: 'asFocusRoving',
  mode: 'once',
  setup(def, options, api) {
    const itemRole = options.itemRole ?? DEFAULT_ITEM_ROLE;
    const snapshotMethodKey = options.snapshotMethodKey ?? DEFAULT_SNAPSHOT_METHOD_KEY;
    const focusMethodKey = options.focusMethodKey ?? DEFAULT_FOCUS_METHOD_KEY;
    const focusFirstMethodKey = options.exposeFocusFirstMethodKey ?? 'focusFirst';
    const focusLastMethodKey = options.exposeFocusLastMethodKey ?? 'focusLast';
    const focusNextMethodKey = options.exposeFocusNextMethodKey ?? 'focusNext';
    const focusPrevMethodKey = options.exposeFocusPrevMethodKey ?? 'focusPrev';
    const focusByIdMethodKey = options.exposeFocusByIdMethodKey ?? 'focusById';
    const focusCurrentMethodKey = options.exposeFocusCurrentMethodKey ?? 'focusCurrent';
    const store = api.store as {
      run?: RunHandle<any>;
      generatedIds?: WeakMap<object, string>;
      nextId?: number;
    };

    store.generatedIds ??= new WeakMap<object, string>();
    store.nextId ??= 0;

    const buildEntries = (): FocusRovingEntry[] => {
      const run = store.run;
      if (!run) return [];
      const parts = run.anatomy.order.partsOf(options.family, itemRole, { missing: 'empty' });
      return parts.map((part, index) => {
        const snapshot = readSnapshot(part, snapshotMethodKey);
        const explicitId = options.getId?.(snapshot, index);
        let id = explicitId ? String(explicitId) : '';
        if (!id) {
          const cached = store.generatedIds?.get(part as object);
          if (cached) {
            id = cached;
          } else {
            id = `focus-roving-${store.nextId}`;
            store.nextId = (store.nextId ?? 0) + 1;
            store.generatedIds?.set(part as object, id);
          }
        }

        return {
          id,
          disabled: options.skipDisabled === false ? false : !!snapshot.disabled,
          focusSelf: part.getExpose(focusMethodKey) as
            | ((options?: { reason?: FocusReason }) => void)
            | null,
        };
      });
    };

    const focusEntry = (
      entry: FocusRovingEntry | undefined,
      optionsArg?: { reason?: FocusReason }
    ) => {
      const run = store.run;
      if (!run || !entry || !entry.focusSelf) return false;
      if (entry.disabled) return false;
      entry.focusSelf({ reason: optionsArg?.reason ?? 'keyboard' });
      return true;
    };

    const findBoundary = (entries: FocusRovingEntry[], direction: 'first' | 'last') => {
      const ordered = direction === 'first' ? entries : entries.slice().reverse();
      return ordered.find((entry) => !entry.disabled);
    };

    const focusById = (id: string, optionsArg?: { reason?: FocusReason }) => {
      if (!id) return false;
      return focusEntry(
        buildEntries().find((entry) => entry.id === id),
        optionsArg
      );
    };

    const focusCurrent = () => {
      const run = store.run;
      if (!run) return false;
      const id = options.getCurrentId?.(run);
      return id ? focusById(String(id), { reason: 'keyboard' }) : false;
    };

    const move = (direction: 'next' | 'prev') => {
      const run = store.run;
      if (!run) return false;
      const entries = buildEntries();
      if (entries.length === 0) return false;

      const activeId = options.getActiveId?.(run);
      const startIndex = activeId
        ? entries.findIndex((entry) => entry.id === String(activeId))
        : -1;
      const step = direction === 'next' ? 1 : -1;
      const fallbackIndex = direction === 'next' ? -1 : entries.length;

      for (
        let cursor = startIndex >= 0 ? startIndex + step : fallbackIndex + step;
        cursor >= 0 && cursor < entries.length;
        cursor += step
      ) {
        if (focusEntry(entries[cursor])) return true;
      }

      if (!options.loop) return false;

      const boundary =
        direction === 'next' ? findBoundary(entries, 'first') : findBoundary(entries, 'last');
      return focusEntry(boundary);
    };

    const focusFirst = () => focusEntry(findBoundary(buildEntries(), 'first'));
    const focusLast = () => focusEntry(findBoundary(buildEntries(), 'last'));

    def.expose.method(focusFirstMethodKey as keyof FocusRovingExposes & string, focusFirst);
    def.expose.method(focusLastMethodKey as keyof FocusRovingExposes & string, focusLast);
    def.expose.method(focusNextMethodKey as keyof FocusRovingExposes & string, () => move('next'));
    def.expose.method(focusPrevMethodKey as keyof FocusRovingExposes & string, () => move('prev'));
    def.expose.method(
      focusByIdMethodKey as keyof FocusRovingExposes & string,
      (id: string, optionsArg?: { reason?: FocusReason }) => focusById(id, optionsArg)
    );
    def.expose.method(focusCurrentMethodKey as keyof FocusRovingExposes & string, focusCurrent);

    def.lifecycle.onMounted((run) => {
      store.run = run;
    });
    def.lifecycle.onUpdated((run) => {
      store.run = run;
    });
    def.lifecycle.onUnmounted(() => {
      store.run = undefined;
    });
  },
});
