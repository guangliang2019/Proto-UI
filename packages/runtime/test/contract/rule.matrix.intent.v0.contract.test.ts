// packages/runtime/test/contract/rule.matrix.intent.v0.contract.test.ts
import { describe, it } from 'vitest';
import { intentDims } from './rule.matrix.fixture';

/**
 * Contract: rule.intent dimensions (v0)
 *
 * This suite enumerates intent-dimension expectations only.
 * Combination-specific assertions live in rule.matrix.combine.
 */
describe('rule contract matrix: intent dimensions (v0)', () => {
  for (const dim of intentDims) {
    describe(dim.title, () => {
      for (const exp of dim.expectations) {
        it.todo(exp);
      }
    });
  }
});
