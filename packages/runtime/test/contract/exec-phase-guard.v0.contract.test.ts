// packages/runtime/test/contract/exec-phase-guard.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { Prototype, OwnedStateHandle } from "@proto-ui/core";
import { executeWithHost, RuntimeHost } from "../../src";

/**
 * Runtime Contract (v0): exec phase guard
 *
 * Working assumptions (v0, aligned with exec-phase-guard.v0.md + lifecycle v0):
 * - setup domain: only setup-safe ops are allowed
 * - runtime domain: only runtime-safe ops are allowed
 * - disposal: handles usable during unmounted callback; unusable after dispose
 *
 * NOTE:
 * We use state module as a "probe" for __sys guards, instead of exposing __sys directly.
 */
describe("runtime contract: exec phase guard (v0)", () => {
  it("setup domain: runtime-only ops must throw; runtime domain begins before created/render", () => {
    const logs: string[] = [];

    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-exec-phase-guard",
      getRawProps() {
        return {};
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
    };

    let s!: OwnedStateHandle<boolean>;

    const P: Prototype = {
      name: "x-runtime-exec-phase-guard",
      setup(def) {
        s = def.state.bool("open", false);

        // setup domain: runtime-only op must throw
        expect(() => s.set(true)).toThrowError(/exec-phase violation/i);

        def.lifecycle.onCreated(() => {
          logs.push("created");

          // runtime domain (callback): setup-only op must throw
          expect(() => s.setDefault(true)).toThrowError(
            /exec-phase violation/i
          );

          // runtime domain: runtime-only op should be allowed here
          expect(() => s.set(true)).not.toThrow();
        });

        def.lifecycle.onMounted(() => {
          logs.push("mounted");

          // still runtime domain
          expect(() => s.setDefault(false)).toThrowError(
            /exec-phase violation/i
          );
          expect(() => s.set(false)).not.toThrow();
        });

        return (r) => {
          logs.push("render");

          // render is runtime domain as well
          expect(() => s.setDefault(true)).toThrowError(
            /exec-phase violation/i
          );

          return [r.el("div", "ok")];
        };
      },
    };

    executeWithHost(P, host);

    // ordering sanity: created before render before mounted (host.schedule immediate here)
    expect(logs).toEqual(["created", "render", "mounted"]);
  });

  it("disposed boundary: handle is usable during unmounted; must throw after dispose", () => {
    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-exec-phase-dispose",
      getRawProps() {
        return {};
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
      onUnmountBegin() {},
    };

    let s!: OwnedStateHandle<number>;

    const P: Prototype = {
      name: "x-runtime-exec-phase-dispose",
      setup(def) {
        s = def.state.numberDiscrete("count", 0);

        def.lifecycle.onUnmounted(() => {
          // during unmounted callback: NOT disposed yet, must be usable
          expect(() => s.get()).not.toThrow();
          expect(() => s.set(1)).not.toThrow();
          expect(() => s.setDefault(2)).toThrow(); // still runtime domain
        });

        return (r) => [r.el("div", "ok")];
      },
    };

    const { invokeUnmounted } = executeWithHost(P, host);
    invokeUnmounted();

    // after invokeUnmounted finishes, module hub should be disposed by host executor,
    // and state handle must become unusable (guarded by __sys.ensureNotDisposed).
    expect(() => s.get()).toThrow();
    expect(() => s.set(3)).toThrow();
    expect(() => s.setDefault(4)).toThrow();
  });
});
