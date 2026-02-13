// packages/modules/expose/test/impl-spec.test.ts
import { describe, it, expect } from 'vitest';
import { ExposeModuleImpl } from '../src/impl';
import { makeCaps, createSysCaps } from './utils/fake-caps';

describe('ExposeModuleImpl (contract-ish)', () => {
  it('setup-only: def.expose throws after setup', () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });
    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    expect(() => impl.expose('a', 1)).not.toThrow();

    sys.__setExecPhase('callback');
    expect(() => impl.expose('b', 2)).toThrow();
  });

  it('rejects invalid or duplicate keys', () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });
    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    expect(() => impl.expose('', 1)).toThrow();
    expect(() => impl.expose(Symbol('x') as any as string, 1)).toThrow();

    impl.expose('x', 1);
    expect(() => impl.expose('x', 2)).toThrow();
  });

  it('getAll returns record with exposed values', () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });
    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    impl.expose('a', 1);
    impl.expose('b', { x: true });

    const all = impl.port.getAll();
    expect(all).toEqual({ a: 1, b: { x: true } });
  });

  it('port helpers: get/has/keys work', () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });
    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    impl.expose('a', 1);
    impl.expose('b', 'x');

    expect(impl.port.get('a')).toBe(1);
    expect(impl.port.has('a')).toBe(true);
    expect(impl.port.has('c')).toBe(false);
    expect(impl.port.keys().sort()).toEqual(['a', 'b']);
  });

  it('publishes to host sink when available', () => {
    const sys = createSysCaps();
    const calls: Array<Record<string, unknown>> = [];
    const caps = makeCaps({
      sys,
      setExposes: (r: Record<string, unknown>) => calls.push(r),
    });

    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    impl.expose('a', 1);
    impl.expose('b', 2);

    expect(calls.length).toBeGreaterThan(0);
    expect(calls[calls.length - 1]).toEqual({ a: 1, b: 2 });

    // cap epoch change should republish
    calls.length = 0;
    (caps as any).__bumpEpoch();
    expect(calls.length).toBe(1);
  });

  it('getDiagnostics returns basic shape', () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });
    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    impl.expose('fn', () => 'ok');
    impl.expose('obj', { a: 1 });

    const diags = impl.port.getDiagnostics?.() ?? [];
    const map = new Map(diags.map((d) => [d.key, d]));

    expect(map.get('fn')?.isFunction).toBe(true);
    expect(map.get('fn')?.valueType).toBe('function');
    expect(map.get('obj')?.isObject).toBe(true);
    expect(map.get('obj')?.valueType).toBe('object');
  });

  it('dispose makes port unusable', () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });
    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    impl.expose('a', 1);

    impl.dispose();
    expect(() => impl.port.getAll()).toThrow();
  });

  it('dispose publishes empty exposes to host sink', () => {
    const sys = createSysCaps();
    const calls: Array<Record<string, unknown>> = [];
    const caps = makeCaps({
      sys,
      setExposes: (r: Record<string, unknown>) => calls.push(r),
    });

    const impl = new ExposeModuleImpl(caps, 'p-x');

    sys.__setExecPhase('setup');
    impl.expose('a', 1);

    impl.dispose();
    expect(calls[calls.length - 1]).toEqual({});
  });
});
