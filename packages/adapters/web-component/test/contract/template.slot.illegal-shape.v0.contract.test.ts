import { describe, it, expect } from "vitest";
import { commitChildren } from "@proto-ui/adapters.web-component";

describe("contract: adapter-web-component / template slot illegal-shape (v0)", () => {
  it("slot must not carry children", () => {
    const host = document.createElement("div");

    const bad = { type: { kind: "slot" }, children: ["x"] } as any;
    expect(() => commitChildren(host, bad)).toThrow();
  });

  it("slot must not carry style", () => {
    const host = document.createElement("div");

    const bad = {
      type: { kind: "slot" },
      style: { kind: "tw", tokens: [] },
    } as any;
    expect(() => commitChildren(host, bad)).toThrow();
  });
});
