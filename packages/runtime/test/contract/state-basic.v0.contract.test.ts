// packages/runtime/test/contract/state-basic.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { Prototype, OwnedStateHandle } from "@proto-ui/core";
import { executeWithHost, RuntimeHost } from "../../src";

/**
 * Runtime Contract (v0): state basic semantics
 * (scope: owned state only; no asHook / no watch / no expose / no event-driven interaction states)
 *
 * Working assumptions (v0, implementation-aligned):
 * - `def.state.*` is setup-only (definition/creation happens only in setup).
 * - `OwnedStateHandle` provides: `get()`, `setDefault(v)`, `set(v, reason?)`.
 * - Phase policy (enforced by runtime/module guards, not by kernel):
 *   - `get()` allowed in setup + runtime.
 *   - `setDefault()` is setup-only. Calling it in runtime MUST throw.
 *   - `set()` is runtime-only. Calling it in setup MUST throw.
 * - State mutation MUST NOT trigger re-render automatically. Rendering only happens on explicit `run.update()`.
 * - Lifecycle ordering guarantee:
 *   - `created` runs before the first render/commit, so `set()` in created is visible to the initial render.
 * - Dispose policy:
 *   - During `unmounted` callback, the instance is still alive; handle operations are allowed.
 *   - After unmount + dispose, all handle operations MUST throw (guard responsibility).
 */
describe("runtime contract: state basic (v0)", () => {
  it("setup: setDefault works; set throws; created sees setup-default; initial render observes it", () => {
    const logs: string[] = [];

    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-state-basic",
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
      name: "x-runtime-state-basic",
      setup(def) {
        s = def.state.bool("open", false);

        // setup: setDefault ok
        s.setDefault(true);

        // setup: set must throw (runtime-only)
        expect(() => s.set(false)).toThrow();

        def.lifecycle.onCreated(() => {
          logs.push(`created:${String(s.get())}`);
        });

        return (r) => {
          logs.push(`render:${String(s.get())}`);
          return [r.el("div", "ok")];
        };
      },
    };

    executeWithHost(P, host);

    // created runs before first render; both should observe the setup-default value.
    expect(logs).toEqual(["created:true", "render:true"]);
  });

  it("created set is visible to initial render; mounted set does not re-render until explicit update()", () => {
    const commits: Array<string> = [];
    const scheduled: Array<() => void> = [];

    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-state-update",
      getRawProps() {
        return {};
      },
      commit(children, signal) {
        commits.push(`commit:${Array.isArray(children) ? children.length : 0}`);
        signal?.done();
      },
      schedule(task) {
        scheduled.push(task);
      },
    };

    let s!: OwnedStateHandle<number>;
    let controller!: { update(): void };

    const P: Prototype = {
      name: "x-runtime-state-update",
      setup(def) {
        s = def.state.numberDiscrete("count", 0);

        def.lifecycle.onCreated(() => {
          // created: runtime phase; set is allowed and must be visible to first render
          s.set(1);
        });

        def.lifecycle.onMounted(() => {
          // mounted: runtime phase; set is allowed but MUST NOT trigger commit automatically
          s.set(2);
          // intentionally NOT calling run.update()
        });

        return (r) => {
          const n = s.get();
          return Array.from({ length: n }, () => r.r.slot());
        };
      },
    };

    const ret = executeWithHost(P, host);
    controller = ret.controller;

    // initial commit must observe created-time set(1)
    expect(commits).toEqual(["commit:1"]);

    // host scheduling flush: mounted has run; state set(2) must NOT auto-commit
    expect(scheduled.length).toBe(1);
    scheduled[0]();
    expect(commits).toEqual(["commit:1"]);

    // explicit update commits new render result
    controller.update();
    expect(commits).toEqual(["commit:1", "commit:2"]);
  });

  it("dispose: usable during unmounted callback; after dispose, get/set/setDefault all throw", () => {
    const host: RuntimeHost<any> = {
      prototypeName: "x-runtime-state-dispose",
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

    let s!: OwnedStateHandle<boolean>;

    const P: Prototype = {
      name: "x-runtime-state-dispose",
      setup(def) {
        s = def.state.bool("alive", true);

        def.lifecycle.onUnmounted(() => {
          // During unmounted callback, instance is still alive; ops are allowed.
          expect(() => s.get()).not.toThrow();
          expect(() => s.set(false)).not.toThrow();
          // setDefault is runtime-forbidden; we intentionally don't assert it here.
        });

        return (r) => [r.el("div", "ok")];
      },
    };

    const { invokeUnmounted } = executeWithHost(P, host);
    invokeUnmounted();

    // After module hub dispose, all operations must throw (guard responsibility).
    expect(() => s.get()).toThrow();
    expect(() => s.set(true)).toThrow();
    expect(() => s.setDefault(true)).toThrow();
  });
});
