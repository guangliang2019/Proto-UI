// packages/adapters/web-component/test/contract/event.router.proto.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { createWebProtoEventRouter } from "@proto-ui/adapters.base";

describe("contract: adapter-web-component / event router proto semantic mapping (v0)", () => {
  it("click -> press.commit (rootTarget)", () => {
    const el = document.createElement("div");
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener("press.commit" as any, (e: any) =>
      calls.push(e)
    );

    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(calls.length).toBe(1);
    expect(calls[0]).toBeInstanceOf(CustomEvent);
    expect((calls[0] as CustomEvent).detail).toBeInstanceOf(MouseEvent);

    router.dispose();
  });

  it("keydown -> key.down (globalTarget)", () => {
    const el = document.createElement("div");
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    router.globalTarget.addEventListener("key.down" as any, (e: any) =>
      calls.push(e)
    );

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "A" }));

    expect(calls.length).toBe(1);
    expect(calls[0]).toBeInstanceOf(CustomEvent);
    expect((calls[0] as CustomEvent).detail).toBeInstanceOf(KeyboardEvent);

    router.dispose();
  });

  it("contextmenu -> context.menu (rootTarget)", () => {
    const el = document.createElement("div");
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener("context.menu" as any, (e: any) =>
      calls.push(e)
    );

    el.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));

    expect(calls.length).toBe(1);
    expect((calls[0] as CustomEvent).detail).toBeInstanceOf(MouseEvent);

    router.dispose();
  });
});
