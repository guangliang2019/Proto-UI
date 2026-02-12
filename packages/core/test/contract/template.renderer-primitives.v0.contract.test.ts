// packages/core/test/contracts/template.renderer-primitives.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import { createRendererPrimitives } from "../../src";

describe("contract: core / template renderer-primitives (v0)", () => {
  it("R1: el(type, {}) treats {} as TemplateProps and sets children to null", () => {
    const { el } = createRendererPrimitives();

    const node = el("div", {} as any);

    // {} is a valid TemplateProps (empty keys)
    expect(node.type).toBe("div");
    expect(node.children).toBeNull();
  });

  it("R2: el() must normalize children with default policy (deep flatten + keepNull=false)", () => {
    const { el } = createRendererPrimitives();

    const node = el("div", ["a", null, ["b"]] as any);

    // default normalize: deep flatten + remove null
    expect(node.children).toEqual(["a", "b"]);
  });

  it("R3: el(type, props, children) must throw if props is not valid TemplateProps", () => {
    const { el } = createRendererPrimitives();

    expect(() => el("div", 123 as any, "x" as any)).toThrow();
    expect(() => el("div", null as any, "x" as any)).toThrow();
    expect(() => el("div", { id: "x" } as any, "x" as any)).toThrow();
  });
});
