// packages/core/test/contracts/template.slot.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { TEMPLATE_SLOT_V0_CASES } from '../cases/template.slot.v0.cases';

describe('contract: core / template slot (protocol constraint)', () => {
  for (const c of TEMPLATE_SLOT_V0_CASES) {
    it(c.name, () => {
      expect(() => c.run()).not.toThrow();
    });
  }
});
