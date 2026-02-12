import { describe, it, expect } from "vitest";
import type { Prototype, TemplateChildren } from "@proto-ui/core";
import { executeWithHost, RuntimeHost } from "../../src";

function createMockHost(prototypeName: string) {
  const calls: string[] = [];
  const scheduled: Array<() => void> = [];
  const commits: TemplateChildren[] = [];

  const host: RuntimeHost<any> = {
    prototypeName,
    getRawProps() {
      return {};
    },
    commit(children, signal) {
      calls.push("commit");
      commits.push(children);
      signal?.done();
    },
    schedule(task) {
      calls.push("schedule-mounted");
      scheduled.push(task);
    },
    // 关键点：不注入 event caps
    onRuntimeReady: () => {},
  };

  return { host, calls, scheduled, commits };
}

describe("runtime contract: event (v0)", () => {
  it("no registrations => event.bind is a no-op and must not require caps", () => {
    const protoName = `t-runtime-no-event-${Math.random()
      .toString(16)
      .slice(2)}`;
    const { host } = createMockHost(protoName);

    const P: Prototype = {
      name: protoName,
      setup(_def: any) {
        // 不注册 def.event.*
        return (r: any) => [r.el("div", {}, ["ok"])];
      },
    };

    // 如果 runtime 已经装载 event module，但实现遵守“no regs => bind no-op”，这里必须不 throw
    expect(() => executeWithHost(P as any, host as any)).not.toThrow();
  });
});
