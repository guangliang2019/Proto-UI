// packages/modules/expose-state/test/impl-spec.test.ts
import { describe, it, expect } from "vitest";
import { ExposeStateModuleImpl } from "../src/impl";
import { createSysCaps, makeCaps } from "./utils/fake-caps";
import type { StateEvent, StateSpec } from "@proto-ui/types";

type FakeHandle<V> = {
  get(): V;
  set(v: V): void;
  __stateId: number;
  __stateSpec: StateSpec;
};

function createStateHarness() {
  let nextId = 1;
  const subs = new WeakMap<object, Set<(e: StateEvent<any>) => void>>();

  const createHandle = <V>(initial: V, spec: StateSpec): FakeHandle<V> => {
    const id = nextId++;
    let value = initial;
    const handle: FakeHandle<V> = {
      get: () => value,
      set: (v: V) => {
        if (Object.is(value, v)) return;
        const prev = value;
        value = v;
        const e: StateEvent<V> = { type: "next", prev, next: v };
        const set = subs.get(handle);
        if (set) for (const cb of set) cb(e);
      },
      __stateId: id,
      __stateSpec: spec,
    };
    return handle;
  };

  const statePort = {
    watch<V>(handle: FakeHandle<V>, cb: (_ctx: unknown, e: StateEvent<V>) => void) {
      let set = subs.get(handle as any);
      if (!set) {
        set = new Set();
        subs.set(handle as any, set);
      }
      const wrapped = (e: StateEvent<V>) => cb(undefined, e);
      set.add(wrapped as any);
      return () => set?.delete(wrapped as any);
    },
  };

  return { createHandle, statePort };
}

function makeExposePort(record: Record<string, unknown>) {
  return {
    getAll() {
      return { ...record };
    },
  };
}

function makeDeps(exposePort: any, statePort: any) {
  return {
    requirePort(name: string) {
      if (name === "expose") return exposePort;
      if (name === "state") return statePort;
      throw new Error(`missing port: ${name}`);
    },
    requireFacade() {
      throw new Error("not used");
    },
    tryFacade() {
      return undefined;
    },
    tryPort() {
      return undefined;
    },
  } as any;
}

describe("ExposeStateModuleImpl (contract-ish)", () => {
  it("projects exposed state handle into external handle shape", () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });

    const { createHandle, statePort } = createStateHarness();
    const h = createHandle(false, { kind: "bool" });
    const exposePort = makeExposePort({ ready: h });

    const deps = makeDeps(exposePort, statePort);
    const impl = new ExposeStateModuleImpl(caps as any, deps);

    const all = impl.port.getAll();
    const ext: any = all.ready;

    expect(ext).toBeTruthy();
    expect(typeof ext.get).toBe("function");
    expect(typeof ext.subscribe).toBe("function");
    expect(typeof ext.unsubscribe).toBe("function");
    expect(ext.spec).toBeTruthy();
    expect(ext.spec.kind).toBe("bool");
  });

  it("external subscribe receives StateEvent without run", () => {
    const sys = createSysCaps();
    const caps = makeCaps({ sys });

    const { createHandle, statePort } = createStateHarness();
    const h = createHandle(false, { kind: "bool" });
    const exposePort = makeExposePort({ ready: h });

    const deps = makeDeps(exposePort, statePort);
    const impl = new ExposeStateModuleImpl(caps as any, deps);

    const ext: any = impl.port.get("ready");

    let got: any = null;
    const off = ext.subscribe((e: any) => {
      got = e;
    });

    h.set(true);

    expect(got).toBeTruthy();
    expect(got.type).toBe("next");
    expect(got.next).toBe(true);

    off();
  });

  it("publishes external exposes to host sink", () => {
    const sys = createSysCaps();
    const calls: Array<Record<string, unknown>> = [];
    const caps = makeCaps({
      sys,
      setExposes: (r: Record<string, unknown>) => calls.push(r),
    });

    const { createHandle, statePort } = createStateHarness();
    const h = createHandle(false, { kind: "bool" });
    const exposePort = makeExposePort({ ready: h });

    const deps = makeDeps(exposePort, statePort);
    const impl = new ExposeStateModuleImpl(caps as any, deps);

    impl.afterRenderCommit();

    expect(calls.length).toBeGreaterThan(0);
    const last = calls[calls.length - 1];
    expect(last.ready).toBeTruthy();
  });

  it("dispose clears host exposes", () => {
    const sys = createSysCaps();
    const calls: Array<Record<string, unknown>> = [];
    const caps = makeCaps({
      sys,
      setExposes: (r: Record<string, unknown>) => calls.push(r),
    });

    const { createHandle, statePort } = createStateHarness();
    const h = createHandle(false, { kind: "bool" });
    const exposePort = makeExposePort({ ready: h });

    const deps = makeDeps(exposePort, statePort);
    const impl = new ExposeStateModuleImpl(caps as any, deps);

    impl.afterRenderCommit();
    impl.dispose();

    expect(calls[calls.length - 1]).toEqual({});
  });
});
