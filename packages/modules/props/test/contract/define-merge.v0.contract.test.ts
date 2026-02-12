// packages/modules/props/test/contract/define-merge.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { PropsKernel } from "../../src/kernel/kernel";
import type { PropsSpecMap } from "@proto-ui/types";

/**
 * Define Merge Contract v0
 * Contract Doc: internal/contracts/props/define-merge.v0.md
 */

function warnings(pm: any) {
  return (pm.getDiagnostics?.() ?? []).filter(
    (d: any) => d.level === "warning"
  );
}

describe("props: define merge semantics (v0)", () => {
  it("PROP-V0-1000: define() rejects invalid spec shape", () => {
    const pm = new PropsKernel<any>();
    expect(() =>
      pm.define({
        a: { kind: "number", range: { min: "bad" } },
      } as any)
    ).toThrow();
  });

  it("PROP-V0-1100: merge kind mismatch MUST throw", () => {
    type P = { a: number };
    const pm = new PropsKernel<P>();

    pm.define({ a: { kind: "number" } } satisfies PropsSpecMap<P>);
    expect(() => pm.define({ a: { kind: "string" } } as any)).toThrow(
      /define merge error/i
    );
  });

  it("PROP-V0-1200: merge empty behavior: stricter => throw; looser => warn + keep stricter; omit => no-op", () => {
    // stricter: fallback -> error => MUST throw
    const pm = new PropsKernel<any>();
    pm.define({ x: { kind: "number" } });
    expect(() =>
      pm.define({ x: { kind: "number", empty: "error" } })
    ).toThrow();

    // looser: error -> accept => warn, but behavior keeps "error"
    // (observable: provided-empty should NOT become null; should fallback to prevValid)
    const pm2 = new PropsKernel<any>();
    pm2.define({ x: { kind: "number", empty: "error" } });

    // establish prevValid=2
    pm2.applyRaw({ x: 2 });
    expect(pm2.get().x).toBe(2);

    const warnBefore = warnings(pm2).length;
    pm2.define({ x: { kind: "number", empty: "accept" } } as any);
    expect(warnings(pm2).length).toBeGreaterThan(warnBefore);

    // if it "kept stricter(error)", provided-empty must fallback to prevValid (2), not become null
    pm2.applyRaw({ x: null } as any);
    expect(pm2.get().x).toBe(2);

    // omit empty => should not warn and should not relax behavior
    const pm3 = new PropsKernel<any>();
    pm3.define({ x: { kind: "number", empty: "error" } });

    // establish prevValid
    pm3.applyRaw({ x: 7 });
    const before = warnings(pm3).length;

    pm3.define({ x: { kind: "number" } } as any); // omit
    expect(warnings(pm3).length).toBe(before);

    pm3.applyRaw({ x: null } as any);
    expect(pm3.get().x).toBe(7);
  });

  it("PROP-V0-1300: merge enum: intersect; widening warns; incompatible throws", () => {
    type P = { mode: string };
    const pm = new PropsKernel<P>();

    pm.define({
      mode: { kind: "string", enum: ["a", "b", "c"] as const, default: "a" },
    } satisfies PropsSpecMap<P>);

    // widening => warn (intersection stays the same, but we can't read spec; just check warning exists)
    pm.define({
      mode: { kind: "string", enum: ["a", "b", "c", "d"] as const },
    } satisfies PropsSpecMap<P>);
    expect(warnings(pm).length).toBeGreaterThan(0);

    // incompatible => throw (no intersection)
    const pm2 = new PropsKernel<P>();
    pm2.define({
      mode: { kind: "string", enum: ["a", "b"] as const },
    } satisfies PropsSpecMap<P>);
    expect(() =>
      pm2.define({ mode: { kind: "string", enum: ["c"] as const } } as any)
    ).toThrow(/define merge error/i);
  });

  it("PROP-V0-1400: merge range: intersect; widening warns; incompatible throws", () => {
    type P = { a: number };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: "number", range: { min: 0, max: 10 }, default: 1 },
    } satisfies PropsSpecMap<P>);

    // widening => warn
    pm.define({
      a: { kind: "number", range: { min: 0, max: 20 } },
    } satisfies PropsSpecMap<P>);
    expect(warnings(pm).length).toBeGreaterThan(0);

    // incompatible => throw (empty intersection)
    const pm2 = new PropsKernel<P>();
    pm2.define({
      a: { kind: "number", range: { min: 0, max: 1 } },
    } satisfies PropsSpecMap<P>);
    expect(() =>
      pm2.define({ a: { kind: "number", range: { min: 5, max: 6 } } } as any)
    ).toThrow(/define merge error/i);
  });

  it("PROP-V0-1500: merge validator: allow add; replacing/removing MUST throw", () => {
    type P = { a: number };
    const pm = new PropsKernel<P>();

    const v1 = (x: number) => x > 0;
    const v2 = (x: number) => x < 100;

    // add when prev missing => ok
    pm.define({ a: { kind: "number" } } satisfies PropsSpecMap<P>);
    pm.define({
      a: { kind: "number", validator: v1 },
    } satisfies PropsSpecMap<P>);

    // replacing => MUST throw
    expect(() =>
      pm.define({ a: { kind: "number", validator: v2 } } as any)
    ).toThrow(/define merge error/i);

    // removing => MUST throw
    const pm2 = new PropsKernel<P>();
    pm2.define({
      a: { kind: "number", validator: v1 },
    } satisfies PropsSpecMap<P>);
    expect(() => pm2.define({ a: { kind: "number" } } as any)).toThrow(
      /define merge error/i
    );
  });

  it("PROP-V0-1600: merge default: change warns + keeps previous; first-time default allowed", () => {
    type P = { a: number };
    const pm = new PropsKernel<P>();

    // first-time default is allowed
    pm.define({ a: { kind: "number" } } satisfies PropsSpecMap<P>);
    pm.define({ a: { kind: "number", default: 1 } } satisfies PropsSpecMap<P>);

    pm.applyRaw({});
    expect(pm.get().a).toBe(1);

    // change default => warn + ignore (observable through get() under missing)
    const beforeWarn = warnings(pm).length;
    pm.define({ a: { kind: "number", default: 2 } } satisfies PropsSpecMap<P>);
    expect(warnings(pm).length).toBeGreaterThan(beforeWarn);

    pm.applyRaw({});
    expect(pm.get().a).toBe(1);
  });

  it("PROP-V0-1700: deterministic merge output (behavior + diags do not depend on insertion order)", () => {
    // NOTE: PropsSpecMap requires all keys, so use `as any` for partial defines.
    type P = { a: number; b: string };

    const k1 = new PropsKernel<P>();
    const k2 = new PropsKernel<P>();

    // same content, different define order
    k1.define({
      a: { kind: "number", range: { min: 0, max: 10 }, default: 1 },
    } as any);
    k1.define({
      b: { kind: "string", enum: ["x", "y"] as const, default: "x" },
    } as any);

    k2.define({
      b: { kind: "string", enum: ["x", "y"] as const, default: "x" },
    } as any);
    k2.define({
      a: { kind: "number", range: { min: 0, max: 10 }, default: 1 },
    } as any);

    // trigger warning-producing merge in both
    k1.define({ a: { kind: "number", range: { min: 0, max: 20 } } } as any);
    k2.define({ a: { kind: "number", range: { min: 0, max: 20 } } } as any);

    k1.applyRaw({});
    k2.applyRaw({});
    expect(k1.get()).toEqual(k2.get());
    expect(k1.getDiagnostics()).toEqual(k2.getDiagnostics());
  });

  it("PROP-V0-1800: define merge failure is atomic (observable behavior unchanged; warnings not partially added)", () => {
    type P = { a: number };
    const pm = new PropsKernel<P>();

    pm.define({
      a: { kind: "number", range: { min: 0, max: 10 }, default: 1 },
    } satisfies PropsSpecMap<P>);

    pm.applyRaw({});
    const beforeValue = pm.get().a;
    const beforeWarn = warnings(pm).length;

    // incompatible range => throw
    expect(() =>
      pm.define({ a: { kind: "number", range: { min: 100, max: 200 } } } as any)
    ).toThrow(/define merge error/i);

    // behavior unchanged
    pm.applyRaw({});
    expect(pm.get().a).toBe(beforeValue);

    // warnings should not grow due to failed merge (atomic)
    expect(warnings(pm).length).toBe(beforeWarn);
  });
});
