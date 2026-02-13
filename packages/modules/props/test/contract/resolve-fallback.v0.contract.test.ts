// packages/modules/props/test/contract/resolve-fallback.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { PropsKernel } from '../../src/kernel/kernel';
import type { PropsSpecMap } from '@proto-ui/types';

/**
 * Resolve & Fallback Contract v0
 * Contract Doc: internal/contracts/props/resolve-fallback.v0.md
 */

describe('props: resolve & fallback semantics (v0)', () => {
  it('PROP-V0-1100: input classification: missing vs provided-empty vs provided-non-empty vs invalid', () => {
    type P = { a: number | null };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: 'number', default: 1, empty: 'accept' },
    } satisfies PropsSpecMap<P>);

    // missing
    pm.applyRaw({} as any);
    expect(pm.isProvided('a')).toBe(false);
    expect(pm.get().a).toBe(1);

    // provided-empty (undefined)
    pm.applyRaw({ a: undefined } as any);
    expect(pm.isProvided('a')).toBe(true);
    expect(pm.get().a).toBeNull();

    // provided-empty (null)
    pm.applyRaw({ a: null } as any);
    expect(pm.isProvided('a')).toBe(true);
    expect(pm.get().a).toBeNull();

    // provided-non-empty valid
    pm.applyRaw({ a: 2 } as any);
    expect(pm.isProvided('a')).toBe(true);
    expect(pm.get().a).toBe(2);

    // invalid non-empty (NaN) — kind:number rejects NaN => fallback (default or prevValid)
    pm.applyRaw({ a: NaN } as any);
    expect(pm.get().a).toBe(2); // prevValid should win over default
  });

  it('PROP-V0-1200: empty="accept" applies ONLY to provided-empty; missing uses fallback; invalid non-empty uses fallback chain', () => {
    type P = { a: number | null };
    const pm = new PropsKernel<P>();

    pm.define({
      a: {
        kind: 'number',
        default: 1,
        empty: 'accept',
        validator: (v) => v > 0,
      },
    } satisfies PropsSpecMap<P>);

    // missing => default
    pm.applyRaw({} as any);
    expect(pm.get().a).toBe(1);

    // provided-empty => accept => null
    pm.applyRaw({ a: undefined } as any);
    expect(pm.get().a).toBeNull();

    // establish prevValid
    pm.applyRaw({ a: 10 } as any);
    expect(pm.get().a).toBe(10);

    // invalid non-empty => fallback to prevValid (NOT null)
    pm.applyRaw({ a: -1 as any } as any);
    expect(pm.get().a).toBe(10);
  });

  it('PROP-V0-1300: empty="fallback" fallback chain order: prevValid > setDefaults > decl.default > null', () => {
    type P = { a: number };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: 'number', default: 1, empty: 'fallback' },
    } satisfies PropsSpecMap<P>);

    // prevValid
    pm.applyRaw({ a: 2 } as any);
    expect(pm.get().a).toBe(2);

    // provided-empty => prevValid wins
    pm.applyRaw({ a: null } as any);
    expect(pm.get().a).toBe(2);

    // clear situation: new kernel to test setDefaults > decl.default > null
    const pm2 = new PropsKernel<P>();
    pm2.define({ a: { kind: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    pm2.setDefaults({ a: 9 });
    pm2.applyRaw({} as any);
    expect(pm2.get().a).toBe(9);

    // no defaults => decl.default
    const pm3 = new PropsKernel<P>();
    pm3.define({ a: { kind: 'number', default: 7 } } satisfies PropsSpecMap<P>);
    pm3.applyRaw({} as any);
    expect(pm3.get().a).toBe(7);

    // no fallbacks at all => null
    const pm4 = new PropsKernel<P>();
    pm4.define({ a: { kind: 'number' } } satisfies PropsSpecMap<P>);
    pm4.applyRaw({} as any);
    expect(pm4.get().a).toBeNull();
  });

  it('PROP-V0-1400: empty="error" throws when no non-empty fallback exists; but uses prevValid when available', () => {
    type P = { a: number };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: 'number', empty: 'error' },
    } satisfies PropsSpecMap<P>);

    // missing => throw (no fallback)
    expect(() => pm.applyRaw({} as any)).toThrow(/empty=\"error\"|missing/i);

    // provided-empty => throw (no fallback)
    expect(() => pm.applyRaw({ a: undefined } as any)).toThrow(/empty=\"error\"/i);
    expect(() => pm.applyRaw({ a: null } as any)).toThrow(/empty=\"error\"/i);

    // now establish prevValid, then empty should fallback (no throw)
    pm.applyRaw({ a: 2 } as any);
    expect(pm.get().a).toBe(2);

    pm.applyRaw({ a: null } as any);
    expect(pm.get().a).toBe(2);
  });

  it('PROP-V0-1500: prevValid stores only non-null values (accept-null MUST NOT write prevValid)', () => {
    type P = { a: number | null };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: 'number', default: 1, empty: 'accept' },
    } satisfies PropsSpecMap<P>);

    // accept => resolved null (must NOT become prevValid)
    pm.applyRaw({ a: null } as any);
    expect(pm.get().a).toBeNull();

    // missing should go to default, not null
    pm.applyRaw({} as any);
    expect(pm.get().a).toBe(1);
  });

  it('PROP-V0-1600: get/getRaw/isProvided semantics', () => {
    type P = { a: number; b: string };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: 'number', default: 1 },
      b: { kind: 'string', default: 'x' },
    } satisfies PropsSpecMap<P>);

    pm.applyRaw({ a: 2, x: 9 } as any);

    // get(): declared keys only, never includes undefined
    const snap = pm.get();
    expect(snap).toEqual({ a: 2, b: 'x' });
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(Object.values(snap).includes(undefined)).toBe(false);

    // getRaw(): raw as-is, include extra keys
    expect(pm.getRaw()).toEqual({ a: 2, x: 9 });

    // isProvided(): own-property
    pm.applyRaw({} as any);
    expect(pm.isProvided('a')).toBe(false);

    pm.applyRaw({ a: undefined } as any);
    expect(pm.isProvided('a')).toBe(true);

    // resolved snapshot is shallowly immutable (frozen)
    const frozen = pm.get() as any;
    expect(() => {
      frozen.a = 999;
    }).toThrow();
  });

  it('PROP-V0-1700: invariants: resolved contains all declared keys; empty canonical is null', () => {
    type P = { a: number; b: string };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: 'number' },
      b: { kind: 'string' },
    } satisfies PropsSpecMap<P>);

    pm.applyRaw({} as any);

    const snap = pm.get();
    expect(snap).toHaveProperty('a');
    expect(snap).toHaveProperty('b');

    // when missing and no fallbacks exist, v0 canonical empty is null
    expect(snap.a).toBeNull();
    expect(snap.b).toBeNull();
  });
});
