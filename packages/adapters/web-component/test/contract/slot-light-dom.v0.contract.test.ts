// packages/adapters/web-component/test/contract/slot-light-dom.v0.contract.test.ts

import { describe, it, expect } from "vitest";
import { LIGHT_SLOT_V0_CASES } from "../cases/slot-light-dom.v0.cases";

describe("contract: adapter-web-component / light-dom slot (v0)", () => {
  for (const c of LIGHT_SLOT_V0_CASES) {
    it(c.name, async () => {
      await expect(Promise.resolve(c.run())).resolves.toBeUndefined();
    });
  }
});
