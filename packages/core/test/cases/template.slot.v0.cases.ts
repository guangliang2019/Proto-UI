// packages/core/test/cases/template.slot.v0.cases.ts
import { createRendererPrimitives } from '../../src';

export type SlotCase = {
  name: string;
  run: () => void;
};

export const TEMPLATE_SLOT_V0_CASES: SlotCase[] = [
  {
    name: 'S1: r.slot() takes no arguments (must throw if provided)',
    run: () => {
      const { r } = createRendererPrimitives();

      let threw = false;
      try {
        (r as any).slot('name');
      } catch {
        threw = true;
      }
      if (!threw) throw new Error("Expected r.slot('name') to throw.");
    },
  },
];
