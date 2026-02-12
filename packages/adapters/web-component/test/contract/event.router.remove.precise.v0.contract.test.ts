// packages/adapters/web-component/test/contract/event.router.remove.precise.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { createWebProtoEventRouter } from "@proto-ui/adapters.base";

describe("contract: adapter-web-component / event router remove precise (v0)", () => {
  it("removeEventListener should remove only the matching callback", () => {
    const el = document.createElement("div");
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: string[] = [];
    const a = () => calls.push("a");
    const b = () => calls.push("b");

    router.rootTarget.addEventListener("native:click" as any, a);
    router.rootTarget.addEventListener("native:click" as any, b);

    router.rootTarget.removeEventListener("native:click" as any, a);

    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(calls).toEqual(["b"]);

    router.dispose();
  });
});
