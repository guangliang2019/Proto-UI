// packages/modules/props/test/contract/props.meta.empty-accept.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { PropsKernel } from '../../src/kernel/kernel';
import type { PropsSpecMap } from '@proto-ui/types';

type P = {
  disabled: boolean | null; // author explicitly allows null
  count: number;
};

const specs: PropsSpecMap<P> = {
  disabled: { kind: 'boolean', empty: 'accept' },
  count: { kind: 'number' },
};

function keysOf(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  // tolerate Set-like (some impls may use Set internally)
  if (typeof v === 'object' && typeof (v as any)[Symbol.iterator] === 'function') {
    return Array.from(v as any);
  }
  return [];
}

describe('props: meta semantics for empty:accept (v0)', () => {
  it('provided empty with empty:accept => resolved null; NOT invalid; is acceptedEmpty', () => {
    const pm = new PropsKernel<P>();
    pm.define(specs);

    const { meta } = pm.applyRaw({ disabled: undefined, count: 1 }) as any;

    // ✅ resolved snapshot check
    expect(pm.get().disabled).toBe(null);
    expect(pm.get().count).toBe(1);

    // ✅ meta checks
    const provided = keysOf(meta?.providedKeys);
    const empty = keysOf(meta?.emptyKeys);
    const acceptedEmpty = keysOf(meta?.acceptedEmptyKeys);
    const invalid = keysOf(meta?.invalidKeys);
    const usedFallback = keysOf(meta?.usedFallbackKeys);

    expect(provided).toContain('disabled');
    expect(empty).toContain('disabled');
    expect(acceptedEmpty).toContain('disabled');
    expect(invalid).not.toContain('disabled');

    // accept 是“输入被接受”，不是 fallback
    expect(usedFallback).not.toContain('disabled');
    expect(provided).toEqual(expect.arrayContaining(['disabled']));
  });

  it('provided non-empty invalid value => invalidKeys + fallback => resolved null (no defaults)', () => {
    const pm = new PropsKernel<P>();
    pm.define(specs);

    const { meta } = pm.applyRaw({ disabled: 'x', count: 1 } as any) as any;

    // ✅ resolved snapshot check: invalid => fallback chain => canonical null (mode any)
    expect(pm.get().disabled).toBe(null);

    // ✅ meta checks
    const provided = keysOf(meta?.providedKeys);
    const empty = keysOf(meta?.emptyKeys);
    const acceptedEmpty = keysOf(meta?.acceptedEmptyKeys);
    const invalid = keysOf(meta?.invalidKeys);
    const usedFallback = keysOf(meta?.usedFallbackKeys);

    expect(provided).toEqual(expect.arrayContaining(['disabled']));
    expect(provided).toContain('disabled');
    expect(empty).not.toContain('disabled'); // it wasn't empty
    expect(invalid).toContain('disabled');
    expect(acceptedEmpty).not.toContain('disabled');
    expect(usedFallback).toContain('disabled');
  });

  it('empty:"error" => provided empty MUST throw when no non-empty fallback exists', () => {
    type P2 = { name: string };
    const pm = new PropsKernel<P2>();
    const specs2: PropsSpecMap<P2> = {
      name: { kind: 'string', empty: 'error' },
    };
    pm.define(specs2);

    expect(() => pm.applyRaw({ name: undefined } as any)).toThrow(/empty="error"/);

    // 可选：也把 null 钉一下（同属 provided empty）
    expect(() => pm.applyRaw({ name: null } as any)).toThrow(/empty="error"/);
  });

  it('missing with empty:error throws if no non-empty fallback exists', () => {
    type P3 = { count: number };
    const pm = new PropsKernel<P3>();
    pm.define({
      count: { kind: 'number', empty: 'error' },
    } satisfies PropsSpecMap<P3>);
    expect(() => pm.applyRaw({} as any)).toThrow(/missing.*empty="error"/);
  });
});
