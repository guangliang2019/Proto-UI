// packages/runtime/test/contract/rule.matrix.when.v0.contract.test.ts
import { describe, it } from 'vitest';
import { whenDims } from './rule.matrix.fixture';

/**
 * Contract: rule.when dimensions (v0)
 *
 * This suite enumerates when-dimension expectations only.
 * Combination-specific assertions live in rule.matrix.combine.
 */
describe('rule contract matrix: when dimensions (v0)', () => {
  for (const dim of whenDims) {
    describe(dim.title, () => {
      for (const exp of dim.expectations) {
        it.todo(exp);
      }
    });
  }
});
