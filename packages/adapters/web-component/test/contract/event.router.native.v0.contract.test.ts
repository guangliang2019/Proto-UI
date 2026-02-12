// packages/adapters/web-component/test/contract/event.router.native.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { createWebProtoEventRouter } from "@proto-ui/adapters.base";

describe("contract: adapter-web-component / event router native:* (v0)", () => {
  it("native:* should forward to real DOM native event (lazy binding)", () => {
    const el = document.createElement("div");

    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    const cb = (ev: any) => calls.push(ev);

    router.rootTarget.addEventListener("native:click" as any, cb);

    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(calls.length).toBe(1);

    router.dispose();
  });

  it("removeEventListener(native:*) must detach correctly", () => {
    const el = document.createElement("div");

    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    const cb = (ev: any) => calls.push(ev);

    router.rootTarget.addEventListener("native:click" as any, cb);
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(calls.length).toBe(1);

    router.rootTarget.removeEventListener("native:click" as any, cb);
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(calls.length).toBe(1);

    router.dispose();
  });

  it("native:* should NOT be delivered to proto semantic type with same suffix", () => {
    const el = document.createElement("div");

    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const callsProto: any[] = [];
    const callsNative: any[] = [];

    router.rootTarget.addEventListener("press.commit" as any, (e: any) =>
      callsProto.push(e)
    );
    router.rootTarget.addEventListener("native:click" as any, (e: any) =>
      callsNative.push(e)
    );

    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // click -> press.commit (proto mapping) 也会发生
    expect(callsProto.length).toBe(1);
    // native:click 也会发生
    expect(callsNative.length).toBe(1);

    // 关键点：两条是不同通路，事件对象形态也不该混
    // proto 侧拿到的是 CustomEvent(detail=MouseEvent)，native 侧拿到的是 MouseEvent
    expect(callsProto[0]).toBeInstanceOf(CustomEvent);
    expect((callsProto[0] as CustomEvent).detail).toBeInstanceOf(MouseEvent);
    expect(callsNative[0]).toBeInstanceOf(MouseEvent);

    router.dispose();
  });
});
