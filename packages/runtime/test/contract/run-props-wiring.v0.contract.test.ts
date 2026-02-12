// packages/runtime/test/contracts/run-props-wiring.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { Prototype } from "@proto-ui/core";
import { executeWithHost, RuntimeHost } from "../../src";

/**
 * Runtime Contract (v0): RunHandle.props wiring
 *
 * Purpose:
 * - Catch "fake run handle" issues by asserting runtime-provided run.props.* exists
 *   AND is coherent with watcher callback arguments.
 *
 * What we assert:
 * - In resolved watchers: run.props.get() deep-equals `next`
 * - In raw watchers: run.props.getRaw() deep-equals `nextRaw`
 * - isProvided() follows raw-own-property semantics, including `undefined`
 *
 * We also assert hydration rule:
 * - First hydration apply during executeWithHost MUST NOT trigger watchers.
 */
describe("runtime contract: run.props wiring (v0)", () => {
  it("controller.applyRawProps triggers watchers; run.props.* must exist and align with watcher args", () => {
    // Mutable raw props for host to return on initial hydration
    let raw: Record<string, any> = { a: 1 };

    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-run-props-wiring",
      getRawProps() {
        return raw;
      },
      commit(_children, signal) {
        // not relevant for this contract test
        signal?.done();
      },
      schedule(task) {
        // mounted scheduling irrelevant here; run it immediately to avoid leakage
        task();
      },
    };

    const seen: string[] = [];

    const P: Prototype = {
      name: "x-runtime-run-props-wiring",
      setup(def) {
        // Declare one prop so resolved snapshot is well-defined
        def.props.define({
          a: { kind: "number", default: 1 },
        } as any);

        // resolved watcher: run.props.get() must match `next`
        def.props.watchAll((run, next, _prev, info) => {
          // surface exists
          expect(typeof run.props.get).toBe("function");
          expect(typeof run.props.getRaw).toBe("function");
          expect(typeof run.props.isProvided).toBe("function");

          // alignment
          expect(run.props.get()).toEqual(next);

          // info sanity
          expect(Array.isArray(info.changedKeysAll)).toBe(true);

          seen.push("resolved");
        });

        // raw watcher: run.props.getRaw() must match `nextRaw`
        def.props.watchRawAll((run, nextRaw, _prevRaw, info) => {
          expect(typeof run.props.get).toBe("function");
          expect(typeof run.props.getRaw).toBe("function");
          expect(typeof run.props.isProvided).toBe("function");

          expect(run.props.getRaw()).toEqual(nextRaw);
          expect(Array.isArray(info.changedKeysAll)).toBe(true);

          seen.push("raw");
        });

        return (r) => [r.el("div", "ok")];
      },
    };

    const { controller } = executeWithHost(P, host);

    // Hydration happened inside executeWithHost. Per v0 contract, watchers should NOT run yet.
    expect(seen).toEqual([]);

    // 1) Trigger a real change via controller.applyRawProps:
    // raw changes a: 1 -> 2, should fire BOTH raw + resolved watchers.
    controller.applyRawProps({ a: 2 });

    // raw watcher + resolved watcher both should have fired exactly once
    expect(seen.sort()).toEqual(["raw", "resolved"].sort());

    // 2) Validate isProvided semantics with undefined:
    // `a` is present as own property even if undefined => isProvided('a') should be true
    // resolved for a should fallback/default depending on your Props rules; here we only check isProvided wiring.
    seen.length = 0;

    controller.applyRawProps({ a: undefined });

    // Should still fire watchers (raw changed; resolved may change or not depending on fallback rules,
    // but raw watcher should certainly fire).
    expect(seen.includes("raw")).toBe(true);

    // To validate isProvided precisely, add a dedicated keyed raw watcher:
    // We can't register watchers after setup, so we validate isProvided in-place by adding one more prototype below.
  });

  it("isProvided follows raw-own-property semantics (including undefined)", () => {
    let raw: Record<string, any> = { a: 1 };

    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-isProvided",
      getRawProps() {
        return raw;
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
    };

    const P: Prototype = {
      name: "x-runtime-isProvided",
      setup(def) {
        def.props.define({
          a: { kind: "number", default: 1 },
        } as any);

        def.props.watchRawAll((run, nextRaw) => {
          // own-property semantics:
          // - if key exists on nextRaw as own property => true
          // - otherwise => false
          const hasOwn = Object.prototype.hasOwnProperty.call(
            nextRaw as any,
            "a"
          );
          expect(run.props.isProvided("a" as any)).toBe(hasOwn);
        });

        return (r) => [r.el("div", "ok")];
      },
    };

    const { controller } = executeWithHost(P, host);

    // hydration: no watcher fired; then trigger changes:

    // a as own property with undefined => isProvided must be true
    controller.applyRawProps({ a: undefined });

    // a missing => isProvided must be false
    controller.applyRawProps({}); // no 'a' own property

    // a present null => isProvided must be true
    controller.applyRawProps({ a: null });
  });
});
