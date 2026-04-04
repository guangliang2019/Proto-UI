import type { PropsBaseType } from '@proto.ui/types';
import type { AnatomyFamily } from './anatomy';
import type { ExposeMethod, ExposeState, RunHandle } from './handles';
import type { State } from './state';

export type CollectionItemSnapshot = Readonly<
  Record<string, unknown> & {
    index: number;
    total: number;
    first: boolean;
    last: boolean;
  }
>;

export type CollectionOptions = {
  family: AnatomyFamily;
  itemRole?: string;
  rootRole?: string | false;
  itemMetaExposeKey?: string;
  countStateKey?: string;
  exposeCountStateKey?: string;
  exposeItemsMethodKey?: string;
  exposeCountMethodKey?: string;
};

export type CollectionExposes = {
  count: ExposeState<number>;
  getCollectionItems: ExposeMethod<() => readonly CollectionItemSnapshot[]>;
  getCollectionCount: ExposeMethod<() => number>;
};

export type CollectionHandles = {
  count: State<number>;
};

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

export type CollectionItemSnapshotExposed = Readonly<
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
  getCollectionItem: ExposeMethod<() => CollectionItemSnapshotExposed>;
};

export type CollectionItemHandles = {
  collectionIndex: State<number>;
  collectionTotal: State<number>;
  collectionFirst: State<boolean>;
  collectionLast: State<boolean>;
};
