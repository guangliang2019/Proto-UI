// packages/runtime/test/contract/props-integration.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { PropsBaseType, PropsSpecMap } from "@proto-ui/types";
import { definePrototype } from "@proto-ui/core";
import { executeWithHost, RuntimeHost } from "../../src";

function createMockHost<P extends PropsBaseType>(
  initialRaw: Record<string, any>
) {
  let raw = { ...(initialRaw ?? {}) };

  const commits: any[] = [];
  const scheduled: Array<() => void> = [];

  const host: RuntimeHost<P> = {
    getRawProps: () => raw,

    commit: (children: any) => {
      commits.push(children);
    },

    schedule: (job: () => void) => {
      scheduled.push(job);
    },

    // optional hooks used by executeWithHost
    onRuntimeReady: () => {},
    onUnmountBegin: () => {},
  } as any;

  const flush = () => {
    while (scheduled.length) {
      const job = scheduled.shift()!;
      job();
    }
  };

  const setHostRaw = (next: Record<string, any>) => {
    raw = { ...(next ?? {}) };
  };

  return { host, commits, flush, setHostRaw };
}

describe("runtime: props integration (v0)", () => {
  it("PROP-RT-0100: hydration does NOT dispatch watchers; second change does (+ PROP-V0-2110 wiring)", () => {
    type P = { a: number } & PropsBaseType;

    const specs = {
      a: { kind: "number" },
    } satisfies PropsSpecMap<P>;

    const calls: Array<{ tag: string; next: any; prev: any }> = [];

    // capture wiring checks from inside callbacks
    const wiring: Array<{
      kind: "resolved" | "raw";
      runGet: any;
      runGetRaw: any;
      runProvidedA: boolean;
      next: any;
      prev: any;
    }> = [];

    const Proto = definePrototype<P>({
      name: "rt-props-0100",
      setup: (def) => {
        def.props.define(specs);

        def.props.watch(["a"], (run, next, prev) => {
          calls.push({
            tag: "resolved:a",
            next: (next as any).a,
            prev: (prev as any).a,
          });

          // PROP-V0-2110: in callback-time, run.props.get == next
          wiring.push({
            kind: "resolved",
            runGet: run.props.get(),
            runGetRaw: run.props.getRaw(),
            runProvidedA: run.props.isProvided("a" as any),
            next,
            prev,
          });
        });

        def.props.watchRaw(["a"], (run, next, prev) => {
          calls.push({
            tag: "raw:a",
            next: (next as any).a,
            prev: (prev as any).a,
          });

          // PROP-V0-2110: in callback-time, run.props.getRaw == nextRaw
          wiring.push({
            kind: "raw",
            runGet: run.props.get(),
            runGetRaw: run.props.getRaw(),
            runProvidedA: run.props.isProvided("a" as any),
            next,
            prev,
          });
        });

        return (r) => r.el("div", {}, []);
      },
    });

    const { host, flush } = createMockHost<P>({ a: 1 });

    const { controller } = executeWithHost(Proto as any, host as any);

    flush();

    // hydration does NOT dispatch watchers
    expect(calls).toEqual([]);
    expect(wiring).toEqual([]);

    // second change MUST dispatch watchers (and must NOT render/commit)
    controller.applyRawProps({ a: 2 } as any);

    const tags = calls.map((x) => x.tag);
    expect(tags).toContain("resolved:a");
    expect(tags).toContain("raw:a");

    const resolved = calls.find((x) => x.tag === "resolved:a")!;
    expect(resolved.prev).toBe(1);
    expect(resolved.next).toBe(2);

    // ✅ PROP-V0-2110 assertions
    const wResolved = wiring.find((x) => x.kind === "resolved")!;
    const wRaw = wiring.find((x) => x.kind === "raw")!;

    // resolved watcher: run.props.get() behaviorally equals next
    expect(wResolved.runGet).toEqual(wResolved.next);

    // raw watcher: run.props.getRaw() behaviorally equals nextRaw
    expect(wRaw.runGetRaw).toEqual(wRaw.next);

    // sanity: run.props surface exists and is consistent enough to use
    expect(typeof (wResolved.runGet as any).a).toBe("number");
    expect(wResolved.runProvidedA).toBe(true);
    expect(wRaw.runProvidedA).toBe(true);
  });

  it("PROP-RT-0120: raw changes but resolved unchanged => only raw watchers fire (+ PROP-V0-2110 wiring)", () => {
    type P = { a: number } & PropsBaseType;

    const specs = {
      a: { kind: "number", empty: "fallback" },
    } satisfies PropsSpecMap<P>;

    const calls: string[] = [];

    const wiring: Array<{
      kind: "resolved" | "raw";
      runGet: any;
      runGetRaw: any;
      runProvidedA: boolean;
      next: any;
      prev: any;
    }> = [];

    const Proto = definePrototype<P>({
      name: "rt-props-0120",
      setup: (def) => {
        def.props.define(specs);

        def.props.watch(["a"], (run, next, prev) => {
          calls.push("resolved");
          wiring.push({
            kind: "resolved",
            runGet: run.props.get(),
            runGetRaw: run.props.getRaw(),
            runProvidedA: run.props.isProvided("a" as any),
            next,
            prev,
          });
        });

        def.props.watchRaw(["a"], (run, next, prev) => {
          calls.push("raw");
          wiring.push({
            kind: "raw",
            runGet: run.props.get(),
            runGetRaw: run.props.getRaw(),
            runProvidedA: run.props.isProvided("a" as any),
            next,
            prev,
          });
        });

        return (r) => r.el("div", {}, []);
      },
    });

    // initial hydration: provided empty (null) => resolved null
    const { host, flush } = createMockHost<P>({ a: null });

    const { controller } = executeWithHost(Proto as any, host as any);

    flush();

    // hydration does NOT dispatch watchers
    expect(calls).toEqual([]);
    expect(wiring).toEqual([]);

    // Change raw: null -> undefined (still "provided" because key exists)
    // Resolved should remain null, so only raw watchers fire.
    controller.applyRawProps({ a: undefined } as any);

    expect(calls).toEqual(["raw"]);

    // ✅ PROP-V0-2110 assertions for raw callback
    const wRaw = wiring.find((x) => x.kind === "raw")!;
    expect(wRaw.runGetRaw).toEqual(wRaw.next);
    expect(wRaw.runProvidedA).toBe(true);

    // optional sanity: resolved snapshot still stable (null)
    expect(wRaw.runGet).toEqual({ a: null });
  });
});

describe("runtime: props integration (v0)", () => {
  // keep your existing PROP-RT-0100 / PROP-RT-0120 tests

  it("PROP-RT-0200: watcher callback run.props wiring aligns with next/nextRaw (PROP-V0-2110)", () => {
    type P = { a: number | null } & PropsBaseType;

    const specs = {
      a: { kind: "number", empty: "accept", default: 1 },
    } satisfies PropsSpecMap<P>;

    const seen: any[] = [];

    const Proto = definePrototype<P>({
      name: "rt-props-0200",
      setup: (def) => {
        def.props.define(specs);

        def.props.watch(["a"], (run, next, prev) => {
          // resolved watcher: run.props.get() ~ next
          const got = run.props.get();
          seen.push({
            tag: "resolved",
            got,
            next,
            prev,
            isProvided: run.props.isProvided("a" as any),
            raw: run.props.getRaw(),
          });

          expect(got).toEqual(next);
          expect(Object.prototype.hasOwnProperty.call(got, "a")).toBe(true);
          expect((got as any).a).not.toBe(undefined);
        });

        def.props.watchRaw(["a"], (run, nextRaw, prevRaw) => {
          // raw watcher: run.props.getRaw() ~ nextRaw
          const gotRaw = run.props.getRaw();
          seen.push({
            tag: "raw",
            gotRaw,
            nextRaw,
            prevRaw,
            isProvided: run.props.isProvided("a" as any),
            resolved: run.props.get(),
          });

          expect(gotRaw).toEqual(nextRaw);
          // isProvided uses own property semantics
          expect(run.props.isProvided("a" as any)).toBe(
            Object.prototype.hasOwnProperty.call(nextRaw as any, "a")
          );
        });

        return (r) => r.el("div", {}, []);
      },
    });

    const { host, flush } = createMockHost<P>({ a: 1 });
    const { controller } = executeWithHost(Proto as any, host as any);
    flush();

    // hydration => no callbacks
    expect(seen).toEqual([]);

    controller.applyRawProps({ a: null } as any);

    // should fire both raw + resolved (raw change + resolved change: 1 -> null)
    expect(seen.map((x) => x.tag)).toEqual(["raw", "resolved"]);

    const rawRec = seen[0];
    expect(rawRec.gotRaw).toEqual({ a: null });
    expect(rawRec.isProvided).toBe(true);

    const resRec = seen[1];
    expect(resRec.got).toEqual({ a: null });
    expect(resRec.isProvided).toBe(true);
  });

  it("PROP-RT-0300: dispatch order is raw(all->keys) then resolved(all->keys), registration order preserved", () => {
    type P = { a: number } & PropsBaseType;

    const specs = {
      a: { kind: "number", default: 1 },
    } satisfies PropsSpecMap<P>;
    const order: string[] = [];

    const Proto = definePrototype<P>({
      name: "rt-props-0300",
      setup: (def) => {
        def.props.define(specs);

        def.props.watchRawAll(() => order.push("rawAll-1"));
        def.props.watchRawAll(() => order.push("rawAll-2"));
        def.props.watchRaw(["a"], () => order.push("rawKey-1"));
        def.props.watchRaw(["a"], () => order.push("rawKey-2"));

        def.props.watchAll(() => order.push("resAll-1"));
        def.props.watchAll(() => order.push("resAll-2"));
        def.props.watch(["a"], () => order.push("resKey-1"));
        def.props.watch(["a"], () => order.push("resKey-2"));

        return (r) => r.el("div", {}, []);
      },
    });

    const { host, flush } = createMockHost<P>({ a: 1 });
    const { controller } = executeWithHost(Proto as any, host as any);
    flush();

    // hydration => no callbacks
    expect(order).toEqual([]);

    controller.applyRawProps({ a: 2 } as any);

    expect(order).toEqual([
      "rawAll-1",
      "rawAll-2",
      "rawKey-1",
      "rawKey-2",
      "resAll-1",
      "resAll-2",
      "resKey-1",
      "resKey-2",
    ]);
  });

  it("PROP-RT-0400: controller.applyRawProps dispatches watchers but does NOT commit/render", () => {
    type P = { a: number } & PropsBaseType;

    const specs = {
      a: { kind: "number", default: 1 },
    } satisfies PropsSpecMap<P>;
    let watched = 0;

    const Proto = definePrototype<P>({
      name: "rt-props-0400",
      setup: (def) => {
        def.props.define(specs);
        def.props.watch(["a"], () => watched++);
        return (r) => r.el("div", {}, []);
      },
    });

    const { host, commits, flush } = createMockHost<P>({ a: 1 });
    const { controller } = executeWithHost(Proto as any, host as any);

    flush();

    const committedAfterMount = commits.length;

    // hydration => no watch
    expect(watched).toBe(0);

    controller.applyRawProps({ a: 2 } as any);

    // watch fired
    expect(watched).toBe(1);

    // but NO new commit triggered by applyRawProps itself
    expect(commits.length).toBe(committedAfterMount);
  });
});
