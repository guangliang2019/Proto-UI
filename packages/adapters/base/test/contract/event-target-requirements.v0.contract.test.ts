// packages/runtime/test/contract/event-target-requirements.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { Prototype, TemplateChildren } from "@proto-ui/core";
import { executeWithHost } from "@proto-ui/runtime";
import type { RuntimeHost } from "@proto-ui/runtime";
import { createHostWiring } from "@proto-ui/adapters.base";
import { EVENT_GLOBAL_TARGET_CAP, EVENT_ROOT_TARGET_CAP } from "@proto-ui/modules.event";

function createHost(
  prototypeName: string,
  opt: {
    rootTarget?: EventTarget | null;
    globalTarget?: EventTarget | null;
  }
) {
  const commits: TemplateChildren[] = [];
  const scheduled: Array<() => void> = [];

  const wiring = createHostWiring({
    prototypeName,
    modules: {
      // runtime 合同测试里只关心 event，就只注入 event caps
      event: () => [
        [EVENT_ROOT_TARGET_CAP, () => opt.rootTarget ?? null],
        [EVENT_GLOBAL_TARGET_CAP, () => opt.globalTarget ?? null],
      ],
    },
  });

  const host: RuntimeHost<any> = {
    prototypeName,
    getRawProps: () => ({}),
    commit(children, signal) {
      commits.push(children);
      signal?.done();
    },
    schedule(task) {
      scheduled.push(task);
    },
    onRuntimeReady(wiringApi) {
      wiring.onRuntimeReady(wiringApi);
    },
  };

  return { host, commits, scheduled };
}

describe("runtime contract: event target requirements (v0)", () => {
  it("root registration requires root target; missing root must throw EVENT_TARGET_UNAVAILABLE (or cap unavailable)", () => {
    const protoName = `t-runtime-event-root-missing-${Math.random()
      .toString(16)
      .slice(2)}`;

    const P: Prototype = {
      name: protoName,
      setup(def: any) {
        def.event.on("press.commit", () => { });
        return (r: any) => [r.el("div", {}, ["ok"])];
      },
    };

    const { host } = createHost(protoName, {
      rootTarget: null,
      globalTarget: new EventTarget(),
    });

    expect(() => executeWithHost(P as any, host as any)).toThrow();
  });

  it("global target is NOT required if there is no global registration", () => {
    const protoName = `t-runtime-event-global-not-needed-${Math.random()
      .toString(16)
      .slice(2)}`;

    const P: Prototype = {
      name: protoName,
      setup(def: any) {
        def.event.on("press.commit", () => { });
        return (r: any) => [r.el("div", {}, ["ok"])];
      },
    };

    const { host } = createHost(protoName, {
      rootTarget: new EventTarget(),
      globalTarget: null, // 缺 global 也应该 OK（因为没有 global registrations）
    });

    expect(() => executeWithHost(P as any, host as any)).not.toThrow();
  });

  it("global registration requires global target; missing global must throw", () => {
    const protoName = `t-runtime-event-global-missing-${Math.random()
      .toString(16)
      .slice(2)}`;

    const P: Prototype = {
      name: protoName,
      setup(def: any) {
        def.event.onGlobal("key.down", () => { });
        return (r: any) => [r.el("div", {}, ["ok"])];
      },
    };

    const { host } = createHost(protoName, {
      rootTarget: new EventTarget(),
      globalTarget: null,
    });

    expect(() => executeWithHost(P as any, host as any)).toThrow();
  });
});
