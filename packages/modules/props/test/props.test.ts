// packages/modules/props/test/props.test.ts

import { describe, it, expect } from 'vitest';

// ✅ 方案 A：如果 module-props 已经从入口导出了 PropsKernel
// import { PropsKernel } from "@proto-ui/modules.props";

// ✅ 方案 B：如果尚未导出，请改成你仓库里真实的导入路径
import { PropsKernel } from '../src/kernel/kernel';

describe('@proto-ui/modules.props PropsKernel (EmptyBehavior)', () => {
  it('PROP-0001: get only returns declared keys, getRaw returns all', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number', default: 1 } });
    pm.applyRaw({ a: 2, x: 9 });

    expect(pm.get()).toEqual({ a: 2 });
    expect(pm.getRaw()).toEqual({ a: 2, x: 9 });
  });

  it('PROP-0002: isProvided uses own property; provided undefined is empty', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number', default: 1 } });

    pm.applyRaw({});
    expect(pm.isProvided('a')).toBe(false);
    expect((pm.get() as any).a).toBe(1);

    pm.applyRaw({ a: undefined });
    expect(pm.isProvided('a')).toBe(true);
    // empty => fallback to default (empty default is fallback)
    expect((pm.get() as any).a).toBe(1);
  });

  it('PROP-0003: setDefaults latest-first wins', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number' } });
    pm.setDefaults({ a: 1 });
    pm.setDefaults({ a: 2 });

    pm.applyRaw({});
    expect((pm.get() as any).a).toBe(2);
  });

  it('PROP-0012: type conflict errors', () => {
    const pm = new PropsKernel<any>();
    pm.define({ disabled: { type: 'boolean' } });

    expect(() => pm.define({ disabled: { type: 'string' } as any })).toThrow();
  });

  it('PROP-0013/0014: enum widen allowed (warning), tighten error', () => {
    const pm = new PropsKernel<any>();
    pm.define({ mode: { type: 'string', enum: ['a', 'b'] } });

    pm.define({ mode: { type: 'string', enum: ['a', 'b', 'c'] } });
    expect(pm.getDiagnostics().some((d: any) => d.level === 'warning')).toBe(true);

    // tightening from current superset to subset would be an error:
    const pm2 = new PropsKernel<any>();
    pm2.define({ mode: { type: 'string', enum: ['a', 'b', 'c'] } });
    expect(() => pm2.define({ mode: { type: 'string', enum: ['a', 'b'] } })).toThrow();
  });

  it('PROP-0020/0021: validator invalid falls back previous-valid > default', () => {
    const pm = new PropsKernel<any>();
    pm.define({
      a: { type: 'number', default: 1, validator: (v: number) => v > 0 },
    });

    pm.applyRaw({ a: -1 });
    expect((pm.get() as any).a).toBe(1);

    pm.applyRaw({ a: 2 });
    expect((pm.get() as any).a).toBe(2);

    pm.applyRaw({ a: -1 });
    expect((pm.get() as any).a).toBe(2);
  });

  it('PROP-0040: get returns readonly snapshot (shallow)', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number', default: 1 } });
    pm.applyRaw({ a: 2 });

    const snap: any = pm.get();
    expect(() => {
      snap.a = 3;
    }).toThrow();
  });

  it('PROP-0100: empty="accept" only accepts PROVIDED empty; missing still uses fallback/default', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number', default: 1, empty: 'accept' } });

    // missing => fallback/default (NOT null)
    pm.applyRaw({});
    expect((pm.get() as any).a).toBe(1);

    // provided empty => accept => null
    pm.applyRaw({ a: null });
    expect((pm.get() as any).a).toBe(null);

    // 注意：provided undefined 在你的语义里等同于 provided empty
    pm.applyRaw({ a: undefined });
    expect((pm.get() as any).a).toBe(null);

    // provided non-empty => normal
    pm.applyRaw({ a: 2 });
    expect((pm.get() as any).a).toBe(2);
  });

  it('PROP-0101: empty="accept" does NOT accept invalid non-empty; invalid falls back', () => {
    const pm = new PropsKernel<any>();
    pm.define({
      a: { type: 'number', default: 1, empty: 'accept', range: { min: 0 } },
    });

    pm.applyRaw({ a: 2 });
    expect((pm.get() as any).a).toBe(2);

    // invalid non-empty => fallback to prevValid (2), NOT null
    pm.applyRaw({ a: -1 as any });
    expect((pm.get() as any).a).toBe(2);
  });

  it('PROP-0110: empty="error" missing throws if no non-empty fallback exists', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number', empty: 'error' } });

    expect(() => pm.applyRaw({})).toThrow();
  });

  it('PROP-0111: empty="error" provided empty throws if no non-empty fallback exists', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number', empty: 'error' } });

    expect(() => pm.applyRaw({ a: null })).toThrow();
    expect(() => pm.applyRaw({ a: undefined })).toThrow();
  });

  it('PROP-0112: empty="error" invalid non-empty throws if no non-empty fallback exists', () => {
    const pm = new PropsKernel<any>();
    pm.define({ a: { type: 'number', empty: 'error', range: { min: 0 } } });

    expect(() => pm.applyRaw({ a: -1 as any })).toThrow();
  });

  it('PROP-0113: empty="error" falls back to prevValid when available (empty + invalid)', () => {
    const pm = new PropsKernel<any>();
    pm.define({
      a: { type: 'number', empty: 'error', range: { min: 0 } },
    });

    pm.applyRaw({ a: 2 });
    expect((pm.get() as any).a).toBe(2);

    // empty => must fallback to non-empty prevValid
    pm.applyRaw({ a: null as any });
    expect((pm.get() as any).a).toBe(2);

    // invalid non-empty => must fallback to non-empty prevValid
    pm.applyRaw({ a: -1 as any });
    expect((pm.get() as any).a).toBe(2);
  });

  it('PROP-0120: merge empty behavior stricter errors; looser warns; omit does nothing', () => {
    // baseline: fallback
    const pm = new PropsKernel<any>();
    pm.define({ x: { type: 'number' } }); // empty defaults to fallback

    // stricter: fallback -> error => error
    expect(() => pm.define({ x: { type: 'number', empty: 'error' } })).toThrow();

    // looser: fallback -> accept => warning
    const pm2 = new PropsKernel<any>();
    pm2.define({ x: { type: 'number' } });
    pm2.define({ x: { type: 'number', empty: 'accept' } });

    expect(
      pm2
        .getDiagnostics()
        .some(
          (d: any) =>
            d.level === 'warning' &&
            d.key === 'x' &&
            String(d.message).includes('empty behavior becomes looser')
        )
    ).toBe(true);

    // omit empty => no warning
    const pm3 = new PropsKernel<any>();
    pm3.define({ x: { type: 'number', empty: 'error' } });
    pm3.define({ x: { type: 'number' } }); // omit empty
    expect(pm3.getDiagnostics().some((d: any) => d.key === 'x')).toBe(false);
  });
});
