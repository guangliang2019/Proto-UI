import { __AS_HOOK_PRIV_PORTS, defineAsHook } from '@proto.ui/core';
import type {
  AnatomyFamily,
  ExposeMethod,
  ExposeState,
  RunHandle,
  State,
  PropsBaseType,
} from '@proto.ui/core';
import type { AnatomyPort } from '@proto.ui/module-anatomy';

export type CollectionItemMeta = Record<string, unknown>;

export type CollectionItemOptions<P extends PropsBaseType = any> = {
  family: AnatomyFamily;
  role?: string;
  metaExposeKey?: string;
  indexStateKey?: string;
  totalStateKey?: string;
  firstStateKey?: string;
  lastStateKey?: string;
  exposeIndexStateKey?: string;
  exposeTotalStateKey?: string;
  exposeFirstStateKey?: string;
  exposeLastStateKey?: string;
  exposeSnapshotMethodKey?: string;
  getMeta?: (run: RunHandle<P>) => CollectionItemMeta;
};

export type CollectionItemSnapshot = Readonly<
  CollectionItemMeta & {
    index: number;
    total: number;
    first: boolean;
    last: boolean;
  }
>;

export type CollectionItemExposes = {
  collectionIndex: ExposeState<number>;
  collectionTotal: ExposeState<number>;
  collectionFirst: ExposeState<boolean>;
  collectionLast: ExposeState<boolean>;
  getCollectionItem: ExposeMethod<() => CollectionItemSnapshot>;
};

export type CollectionItemHandles = {
  collectionIndex: State<number>;
  collectionTotal: State<number>;
  collectionFirst: State<boolean>;
  collectionLast: State<boolean>;
};

const DEFAULT_ROLE = 'item';
const DEFAULT_META_EXPOSE_KEY = '__collectionItem';

function getAnatomyPort(def: unknown): AnatomyPort {
  const ports = (def as any)?.[__AS_HOOK_PRIV_PORTS] as Record<string, unknown> | undefined;
  const anatomy = ports?.anatomy as AnatomyPort | undefined;
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
    const anatomy = getAnatomyPort(def);
    const role = options.role ?? DEFAULT_ROLE;
    const metaExposeKey = options.metaExposeKey ?? DEFAULT_META_EXPOSE_KEY;
    const index = def.state.numberDiscrete(options.indexStateKey ?? 'collectionIndex', -1);
    const total = def.state.numberDiscrete(options.totalStateKey ?? 'collectionTotal', 0);
    const first = def.state.bool(options.firstStateKey ?? 'collectionFirst', false);
    const last = def.state.bool(options.lastStateKey ?? 'collectionLast', false);

    api.store.snapshot = {
      index: -1,
      total: 0,
      first: false,
      last: false,
    } as CollectionItemSnapshot;
    api.store.version = -1;

    def.anatomy.claim(options.family, { role });

    const sync = (run: RunHandle<any>, forceMeta = false) => {
      const version = run.anatomy.order.version(options.family);
      if (!forceMeta && api.store.version === version) return;
      const nextIndex = run.anatomy.order.indexOfSelf(options.family, role);
      const nextTotal = run.anatomy.order.partsOf(options.family, role).length;
      const nextFirst = nextIndex === 0 && nextTotal > 0;
      const nextLast = nextIndex >= 0 && nextIndex === nextTotal - 1;
      const nextMeta = options.getMeta?.(run) ?? {};

      index.set(nextIndex, 'reason: asCollectionItem.sync => index');
      total.set(nextTotal, 'reason: asCollectionItem.sync => total');
      first.set(nextFirst, 'reason: asCollectionItem.sync => first');
      last.set(nextLast, 'reason: asCollectionItem.sync => last');
      api.store.snapshot = {
        ...nextMeta,
        index: nextIndex,
        total: nextTotal,
        first: nextFirst,
        last: nextLast,
      } as CollectionItemSnapshot;
      api.store.version = version;
    };

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
      () => api.store.snapshot as CollectionItemSnapshot
    );
    def.expose.method(metaExposeKey as any, () => api.store.snapshot as CollectionItemSnapshot);

    def.lifecycle.onMounted((run) => {
      sync(run, true);
      api.store.offOrder = anatomy.subscribeOrder(options.family, (ctx) => {
        sync(ctx as RunHandle<any>);
      });
    });
    def.lifecycle.onUpdated((run) => {
      sync(run, true);
    });
    def.lifecycle.onUnmounted(() => {
      (api.store.offOrder as (() => void) | undefined)?.();
      api.store.offOrder = undefined;
    });
  },
});
