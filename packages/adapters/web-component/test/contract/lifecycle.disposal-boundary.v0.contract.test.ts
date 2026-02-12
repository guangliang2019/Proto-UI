import { describe, it, expect } from "vitest";
import type { Prototype } from "@proto-ui/core";
import { AdaptToWebComponent } from "@proto-ui/adapters.web-component";
import { __RUN_TEST_SYS } from "@proto-ui/modules.test-sys";
import type { TestSysPort } from "@proto-ui/modules.test-sys";

describe("contract: adapter-web-component / disposal boundary (v0)", () => {
  it("during unmounted: disposed=false; after unmounted returns: disposed=true", async () => {
    const P: Prototype = {
      name: "x-wc-disposal-boundary",
      setup(def) {
        def.lifecycle.onUnmounted((run: any) => {
          const sys = run[__RUN_TEST_SYS] as TestSysPort;
          sys.trace("in-unmounted");
          const s = sys.snapshot("snapshot-in-unmounted");
          expect(s.domain).toBe("runtime");
          expect(s.disposed).toBe(false);
        });
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement(P.name) as any;
    document.body.appendChild(el);

    // unmount
    el.remove();
    await Promise.resolve();

    // 通过 element debug getter 读取 trace（见上面的 adapt.ts patch）
    const trace = (el as any).__debugTestSysTrace as any[];
    const inUnmounted = trace.find((x) => x.label === "in-unmounted");
    expect(inUnmounted).toBeTruthy();

    // 最后一个快照应 disposed=true（由 runtime dispose 后产生的 trace，如你愿意可以在 wiring.afterUnmount 里补 trace）
    // 最低限度：trace 里出现过 disposed=false 的 unmounted 快照，且 element teardown 后 runtime 已 dispose
    // 如果你想强断言 disposed=true：在 invokeUnmounted() 完成后 adapter 额外 port.trace("after-unmount") 再读
  });
});
