import { describe, it, expect } from "vitest";
import { asPrototypeRef } from "@proto-ui/core";
import {
  commitChildren,
  ERR_TEMPLATE_PROTOTYPE_REF_V0,
} from "../../src/commit";

describe("contract: adapter-web-component / template no-prototype-composition (v0)", () => {
  it("must throw the required error when TemplateNode.type is PrototypeRef", () => {
    const FakeProto = {
      name: "x-fake-proto",
      setup() {
        return () => null;
      },
    } as any;

    const bad = {
      type: asPrototypeRef(FakeProto),
      children: null,
    } as any;

    const host = document.createElement("div");

    expect(() => commitChildren(host, bad)).toThrowError(
      ERR_TEMPLATE_PROTOTYPE_REF_V0
    );
  });
});
