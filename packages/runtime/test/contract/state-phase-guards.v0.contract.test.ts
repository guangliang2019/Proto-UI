// packages/runtime/test/contract/state-phase-guards.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { Prototype, OwnedStateHandle } from "@proto-ui/core";
import { executeWithHost, RuntimeHost } from "../../src";


/**
 * Runtime Contract (v0): phase guards for OwnedStateHandle APIs
 *
 * This file asserts the *runtime-enforced* phase policy for owned state:
 * - setup phase:
 *   - `setDefault()` allowed
 *   - `set()` MUST throw
 * - runtime callback phase (e.g. created/mounted/updated/unmounted):
 *   - `set()` allowed
 *   - `setDefault()` MUST throw
 *
 * Notes:
 * - The kernel itself is intentionally phase-agnostic; it accepts operations anytime.
 * - Phase enforcement is a runtime/module concern (SystemCaps / exec-phase guard / module wrapper).
 * - This contract intentionally does NOT cover watch/borrowed/observed/exposed projections.
 */
describe("runtime contract: state phase guards (v0)", () => {
  it("owned handle phase guards: setDefault setup-only; set runtime-only", () => {
    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-state-guards",
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
      name: "x-runtime-state-guards",
      setup(def) {
        s = def.state.bool("open", false);

        // setup: set must throw; setDefault allowed
        expect(() => s.set(true)).toThrow();
        expect(() => s.setDefault(false)).not.toThrow();

        def.lifecycle.onCreated(() => {
          // runtime callback: set allowed; setDefault must throw
          expect(() => s.setDefault(true)).toThrow();
          expect(() => s.set(true)).not.toThrow();
        });

        return (r) => [r.el("div", "ok")];
      },
    };

    executeWithHost(P, host);
  });
});
