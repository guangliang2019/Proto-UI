// packages/adapters/web-component/test/contract/event.router.extension.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { createWebProtoEventRouter } from "@proto-ui/adapters.base";

describe("contract: adapter-web-component / event router extension events (v0)", () => {
  it("native:* MUST be supported: click -> native:click", () => {
    const el = document.createElement("div");
    const global = new EventTarget();

    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: global,
      isEnabled: () => true,
    });

    let got: any = null;
    r.rootTarget.addEventListener("native:click", (e: any) => (got = e));

    const native = new MouseEvent("click", { bubbles: true });
    el.dispatchEvent(native);

    // 你现在实现下 got 仍然为 null，这就是缺失
    expect(got).not.toBeNull();

    r.dispose();
  });
});
