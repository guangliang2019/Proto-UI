// packages/runtime/test/contract/rule.matrix.combine.v0.contract.test.ts
import { describe, it } from "vitest";
import { combos } from "./rule.matrix.fixture";

/**
 * Contract: rule.when x rule.intent combinations (v0)
 *
 * This suite only captures cross-dimension expectations.
 */
describe("rule contract matrix: when x intent combinations (v0)", () => {
  for (const c of combos) {
    const title = `when:${c.when} x intent:${c.intent}`;
    describe(title, () => {
      for (const exp of c.expectations) {
        it.todo(exp);
      }
    });
  }
});

