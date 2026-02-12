import { describe, it, expect } from "vitest";
import { commitChildren } from "@proto-ui/adapters.web-component";

describe("contract: adapter-web-component / commit full rebuild (v0)", () => {
  it("must replace hostRoot children on every commit", () => {
    const host = document.createElement("div");

    commitChildren(host, { type: "div", children: ["a"] } as any);
    const firstDiv = host.firstElementChild;
    expect(firstDiv?.tagName.toLowerCase()).toBe("div");

    commitChildren(host, { type: "div", children: ["b"] } as any);
    const secondDiv = host.firstElementChild;

    // not the same node => rebuild
    expect(secondDiv).not.toBe(firstDiv);
    expect(host.innerHTML).toBe("<div>b</div>");
  });
});
