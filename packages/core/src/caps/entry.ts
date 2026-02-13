// packages/core/src/caps/entry.ts
import { CapToken } from './token';

/**
 * Attach payload type.
 * We deliberately avoid plain object to prevent string keys sneaking back in.
 */
export type CapEntries = ReadonlyArray<readonly [CapToken<any>, any]>;
