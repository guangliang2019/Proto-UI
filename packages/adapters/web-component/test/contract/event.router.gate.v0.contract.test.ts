// packages/adapters/web-component/test/contract/event.router.gate.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { createWebProtoEventRouter } from "@proto-ui/adapters.base";

describe("contract: adapter-web-component / event router gate (v0)", () => {
  it("when gate disabled, proto semantic events must not be emitted", () => {
    const el = document.createElement("div");
    let enabled = true;

    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => enabled,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener("press.commit" as any, (e: any) =>
      calls.push(e)
    );

    enabled = false;
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(calls).toEqual([]);

    router.dispose();
  });

  it("when gate disabled, native:* must also be blocked (avoid unmount races)", () => {
    const el = document.createElement("div");
    let enabled = true;

    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => enabled,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener("native:click" as any, (e: any) =>
      calls.push(e)
    );

    enabled = false;
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(calls).toEqual([]);

    router.dispose();
  });

  it("when gate disabled, host.* must also be blocked", () => {
    const el = document.createElement("div");
    let enabled = true;

    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => enabled,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener("host.click" as any, (e: any) =>
      calls.push(e)
    );

    enabled = false;
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(calls).toEqual([]);

    router.dispose();
  });
});
