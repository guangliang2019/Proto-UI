import type { PropsSpecMap } from '@proto-ui/types';

type P = { disabled: boolean | null; count: number };

// ✅ should compile
({
  disabled: { type: 'boolean', empty: 'accept' },
  count: { type: 'number' },
}) satisfies PropsSpecMap<P>;

// ❌ empty:"accept" requires null in declared type
type P2 = { disabled: boolean; count: number };

({
  // @ts-expect-error empty:"accept" would resolve to boolean|null, incompatible with boolean
  disabled: { type: 'boolean', empty: 'accept' },
  count: { type: 'number' },
}) satisfies PropsSpecMap<P2>;

// ❌ kind mismatch

({
  disabled: { type: 'boolean', empty: 'accept' },
  // @ts-expect-error count is number in P, but spec says string
  count: { kind: 'string' },
}) satisfies PropsSpecMap<P>;
