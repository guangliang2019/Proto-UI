import { defineAsHook } from '@proto.ui/core';
import type {
  CollectionItemExposes,
  CollectionItemHandles,
  CollectionItemMeta,
  CollectionItemOptions,
  CollectionItemSnapshotExposed as CollectionItemSnapshot,
  RunHandle,
  State,
} from '@proto.ui/core';
import type { AnatomyPort } from '@proto.ui/module-anatomy';
import { getActiveAsHookContext } from '@proto.ui/core/internal';

type CollectionItemStore = {
  snapshot: CollectionItemSnapshot;
  version: number;
  offOrder?: (() => void) | undefined;
};

const DEFAULT_ROLE = 'item';
const DEFAULT_META_EXPOSE_KEY = '__collectionItem';

function getAnatomyPort(): AnatomyPort {
  const { ports } = getActiveAsHookContext('asCollectionItem');
  const anatomy = ports.anatomy as AnatomyPort | undefined;
  if (!anatomy?.order || typeof anatomy.subscribeOrder !== 'function') {
    throw new Error('[AsHook:asCollectionItem] anatomy port unavailable.');
  }
  return anatomy;
}

export const asCollectionItem = defineAsHook<
  any,
  CollectionItemExposes,
  CollectionItemHandles,
  CollectionItemOptions<any>
>({
  name: 'asCollectionItem',
  mode: 'once',
  setup(def, options, api) {
    const store = api.store as CollectionItemStore;
    const anatomy = getAnatomyPort();
    const role = options.role ?? DEFAULT_ROLE;
    const metaExposeKey = options.metaExposeKey ?? DEFAULT_META_EXPOSE_KEY;
    const index = def.state.numberDiscrete(options.indexStateKey ?? 'collectionIndex', -1);
    const total = def.state.numberDiscrete(options.totalStateKey ?? 'collectionTotal', 0);
    const first = def.state.bool(options.firstStateKey ?? 'collectionFirst', false);
    const last = def.state.bool(options.lastStateKey ?? 'collectionLast', false);

    store.snapshot = {
      index: -1,
      total: 0,
      first: false,
      last: false,
    } as CollectionItemSnapshot;
    store.version = -1;

    def.anatomy.claim(options.family, { role });

    const readMetaFromSnapshot = (): CollectionItemMeta => {
      const current = (store.snapshot ?? {}) as Record<string, unknown>;
      const { index: _index, total: _total, first: _first, last: _last, ...meta } = current;
      return meta;
    };

    const writeSnapshot = (
      nextIndex: number,
      nextTotal: number,
      nextMeta: CollectionItemMeta,
      version: number
    ) => {
      const nextFirst = nextIndex === 0 && nextTotal > 0;
      const nextLast = nextIndex >= 0 && nextIndex === nextTotal - 1;

      index.set(nextIndex, 'reason: asCollectionItem.sync => index');
      total.set(nextTotal, 'reason: asCollectionItem.sync => total');
      first.set(nextFirst, 'reason: asCollectionItem.sync => first');
      last.set(nextLast, 'reason: asCollectionItem.sync => last');
      store.snapshot = {
        ...nextMeta,
        index: nextIndex,
        total: nextTotal,
        first: nextFirst,
        last: nextLast,
      } as CollectionItemSnapshot;
      store.version = version;
    };

    const readPositionFromPort = () => {
      const nextIndex = anatomy.order.indexOfSelf(options.family, role, { missing: 'null' });
      const parts = anatomy.order.partsOf(options.family, role, { missing: 'null' });
      if (nextIndex == null || parts == null) {
        return {
          index: store.snapshot.index ?? -1,
          total: store.snapshot.total ?? 0,
          first: store.snapshot.first ?? false,
          last: store.snapshot.last ?? false,
        };
      }
      const nextTotal = parts.length;
      return {
        index: nextIndex,
        total: nextTotal,
        first: nextIndex === 0 && nextTotal > 0,
        last: nextIndex >= 0 && nextIndex === nextTotal - 1,
      };
    };

    const sync = (run: RunHandle<any>, forceMeta = false) => {
      const nextMeta = options.getMeta?.(run) ?? readMetaFromSnapshot();
      const version = run.anatomy.order.version(options.family, { missing: 'null' });
      const nextIndex = run.anatomy.order.indexOfSelf(options.family, role, { missing: 'null' });
      const parts = run.anatomy.order.partsOf(options.family, role, { missing: 'null' });
      if (version == null || nextIndex == null || parts == null) {
        api.store.snapshot = {
          ...nextMeta,
          index: store.snapshot.index ?? -1,
          total: store.snapshot.total ?? 0,
          first: store.snapshot.first ?? false,
          last: store.snapshot.last ?? false,
        } as CollectionItemSnapshot;
        return;
      }
      if (!forceMeta && store.version === version) return;
      writeSnapshot(nextIndex, parts.length, nextMeta, version);
    };

    const wrapGetter = <T>(
      state: State<T>,
      select: (position: { index: number; total: number; first: boolean; last: boolean }) => T
    ) => {
      const get = state.get.bind(state);
      (state as any).get = () => {
        const position = readPositionFromPort();
        const current = get();
        const next = select(position);
        return Object.is(current, next) ? current : next;
      };
    };

    wrapGetter(index, (position) => position.index as number);
    wrapGetter(total, (position) => position.total as number);
    wrapGetter(first, (position) => position.first as boolean);
    wrapGetter(last, (position) => position.last as boolean);

    def.expose.state(
      (options.exposeIndexStateKey ?? 'collectionIndex') as keyof CollectionItemExposes & string,
      index
    );
    def.expose.state(
      (options.exposeTotalStateKey ?? 'collectionTotal') as keyof CollectionItemExposes & string,
      total
    );
    def.expose.state(
      (options.exposeFirstStateKey ?? 'collectionFirst') as keyof CollectionItemExposes & string,
      first
    );
    def.expose.state(
      (options.exposeLastStateKey ?? 'collectionLast') as keyof CollectionItemExposes & string,
      last
    );
    def.expose.method(
      (options.exposeSnapshotMethodKey ?? 'getCollectionItem') as keyof CollectionItemExposes &
        string,
      () => {
        return {
          ...readMetaFromSnapshot(),
          ...readPositionFromPort(),
        } as CollectionItemSnapshot;
      }
    );
    def.expose.method(metaExposeKey as any, () => {
      return {
        ...readMetaFromSnapshot(),
        ...readPositionFromPort(),
      } as CollectionItemSnapshot;
    });

    def.lifecycle.onMounted((run) => {
      sync(run, true);
      store.offOrder = anatomy.subscribeOrder(options.family, (ctx) => {
        sync(ctx as RunHandle<any>);
      });
    });
    def.lifecycle.onUpdated((run) => {
      sync(run, true);
    });
    def.lifecycle.onUnmounted(() => {
      store.offOrder?.();
      store.offOrder = undefined;
    });
  },
});
