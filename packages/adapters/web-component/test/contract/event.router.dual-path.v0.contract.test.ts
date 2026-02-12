// packages/adapters/web-component/test/contract/event.router.dual-path.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { createWebProtoEventRouter } from "@proto-ui/adapters.base";

describe("contract: adapter-web-component / event router dual-path (v0)", () => {
  it("native:* and proto semantic can coexist for same native trigger", () => {
    const el = document.createElement("div");
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const seen: string[] = [];

    router.rootTarget.addEventListener("native:click" as any, () =>
      seen.push("native")
    );
    router.rootTarget.addEventListener("press.commit" as any, () =>
      seen.push("proto")
    );

    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // 不强制顺序（实现细节），只要都发生
    expect(seen.sort()).toEqual(["native", "proto"]);

    router.dispose();
  });
});
