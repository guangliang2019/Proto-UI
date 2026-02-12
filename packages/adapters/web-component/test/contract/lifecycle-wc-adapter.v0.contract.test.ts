// packages/adapters/web-component/test/contract/lifecycle-wc-adapter.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { Prototype } from "@proto-ui/core";
import { AdaptToWebComponent } from "@proto-ui/adapters.web-component";

describe("contract: adapter-web-component / lifecycle (v0)", () => {
  it("created before mounted; mounted scheduled by adapter.schedule", async () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: "x-wc-life-contract-1",
      setup(def) {
        def.lifecycle.onCreated(() => calls.push("created"));
        def.lifecycle.onMounted(() => calls.push("mounted"));
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement("x-wc-life-contract-1") as any;
    document.body.appendChild(el);

    // WC adapter default schedule is microtask, but keep it general:
    await Promise.resolve();

    expect(calls[0]).toBe("created");
    expect(calls[1]).toBe("mounted");
  });

  it("disconnected triggers unmounted (adapter must call invokeUnmounted)", async () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: "x-wc-life-contract-2",
      setup(def) {
        def.lifecycle.onUnmounted(() => calls.push("unmounted"));
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement("x-wc-life-contract-2") as any;
    document.body.appendChild(el);

    el.remove();
    await Promise.resolve();

    expect(calls.includes("unmounted")).toBe(true);
  });
});
