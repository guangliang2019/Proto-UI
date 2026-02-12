// packages/core/test/contracts/template.normalize.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { NORMALIZE_V0_CASES } from "../cases/normalize.v0.cases";

describe("contract: core / template normalize (v0)", () => {
  for (const c of NORMALIZE_V0_CASES) {
    it(c.name, () => {
      expect(() => c.run()).not.toThrow();
    });
  }
});
