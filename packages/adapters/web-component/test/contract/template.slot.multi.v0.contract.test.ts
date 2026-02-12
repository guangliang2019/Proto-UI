import { describe, it, expect } from "vitest";
import { commitChildren } from "@proto-ui/adapters.web-component";

describe("contract: adapter-web-component / template slot multi (v0)", () => {
  it("multiple slot nodes must throw", () => {
    const host = document.createElement("div");

    const bad = [
      { type: { kind: "slot" }, children: null },
      { type: { kind: "slot" }, children: null },
    ] as any;

    expect(() => commitChildren(host, bad)).toThrow();
  });
});
