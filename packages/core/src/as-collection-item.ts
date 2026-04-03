import { getCoreHookBackend } from './as-hook-backends';
import type { AsHookCaller } from './prototype';
import type {
  CollectionItemExposes,
  CollectionItemHandles,
  CollectionItemOptions,
} from './collection';

export const asCollectionItem = ((options?: CollectionItemOptions<any>) => {
  const backend = getCoreHookBackend('asCollectionItem');
  if (!backend) {
    throw new Error(`[AsHook] runtime backend unavailable for asCollectionItem.`);
  }
  return backend(options);
}) as AsHookCaller<any, CollectionItemExposes, CollectionItemHandles, CollectionItemOptions<any>>;
