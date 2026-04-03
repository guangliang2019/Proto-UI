import { getCoreHookBackend } from './as-hook-backends';
import type { AsHookCaller } from './prototype';
import type { CollectionExposes, CollectionHandles, CollectionOptions } from './collection';

export const asCollection = ((options?: CollectionOptions) => {
  const backend = getCoreHookBackend('asCollection');
  if (!backend) {
    throw new Error(`[AsHook] runtime backend unavailable for asCollection.`);
  }
  return backend(options);
}) as AsHookCaller<any, CollectionExposes, CollectionHandles, CollectionOptions>;
