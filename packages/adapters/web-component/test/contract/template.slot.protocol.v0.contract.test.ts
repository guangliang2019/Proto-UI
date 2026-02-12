// packages/adapters/web-component/test/contract/template.slot.protocol.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { commitChildren } from "../../src/commit";

describe("contract: adapter-web-component / template slot protocol constraints (v0)", () => {
  it("S2: multiple slot nodes MUST throw", () => {
    const host = document.createElement("div");

    const slot = { type: { kind: "slot" }, children: null } as any;

    // Two slots in one render output (top-level array)
    expect(() => commitChildren(host, [slot, slot] as any)).toThrow();

    // Also test nested under an element (still one output)
    expect(() =>
      commitChildren(host, { type: "div", children: [slot, slot] } as any)
    ).toThrow();
  });

  it("S1/S3: slot must be anonymous and carry no extra fields (defensive rejection)", () => {
    const host = document.createElement("div");

    const namedSlot = {
      type: { kind: "slot", name: "x" },
      children: null,
    } as any;

    expect(() => commitChildren(host, namedSlot)).toThrow();
  });
});
