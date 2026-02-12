import { describe, it, expect } from "vitest";
import { createRendererPrimitives } from "@proto-ui/core";

describe("core template reserved slot (v0)", () => {
  it("slot() takes no arguments (named slot not supported)", () => {
    const { r } = createRendererPrimitives();
    expect(() => (r as any).slot("name")).toThrow(
      /\[Template\] slot\(\) takes no arguments.\n illegal slot arguments: \["name"\]/
    );
  });
});
