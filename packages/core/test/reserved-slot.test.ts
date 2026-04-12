import { describe, it, expect } from 'vitest';
import { createRendererPrimitives } from '@proto.ui/core';

describe('core template reserved slot (v0)', () => {
  it('exposes slot() as a top-level renderer primitive alias', () => {
    const { slot, r } = createRendererPrimitives();
    expect(slot).toBe(r.slot);
    expect(slot()).toEqual({ type: { kind: 'slot' }, children: null });
  });

  it('slot() takes no arguments (named slot not supported)', () => {
    const { r } = createRendererPrimitives();
    expect(() => (r as any).slot('name')).toThrow(
      /\[Template\] slot\(\) takes no arguments.\n illegal slot arguments: \["name"\]/
    );
  });
});
