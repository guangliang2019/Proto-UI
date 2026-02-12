import { it, expect } from "vitest";
import { AdaptToWebComponent } from "../src/adapt";
import { tw } from "@proto-ui/core";

it("template-props style(tw) does not throw, and is ignored by default without resolver", async () => {
  AdaptToWebComponent({
    name: "x-tpl-tw",
    setup(_def) {
      return (renderer) => [
        renderer.el("span", { style: tw("text-red-500") }, ["x"]),
      ];
    },
  });

  const el = document.createElement("x-tpl-tw") as any;
  document.body.appendChild(el);
  await Promise.resolve();

  const span = el.querySelector("span") as HTMLSpanElement | null;
  expect(span).not.toBeNull();

  // default behavior: no resolver => ignore tw style (should not set inline style)
  expect(span!.getAttribute("style")).toBeNull();
  expect(el.innerHTML).toBe("<span>x</span>");
});

it("template-props rejects illegal keys (expose/attr channel must not exist in template)", async () => {
  AdaptToWebComponent({
    name: "x-tpl-illegal-props",
    setup(_def) {
      return (renderer) => [
        // @ts-expect-error - template-props only allows { style?: TemplateStyleHandle }
        renderer.el("span", { id: "x" }, ["x"]),
      ];
    },
  });

  const el = document.createElement("x-tpl-illegal-props") as any;

  expect(() => {
    document.body.appendChild(el);
  }).toThrow();

  // cleanup in case it partially mounted (defensive)
  try {
    el.remove();
  } catch {}
});

it("template-props rejects non-TemplateStyleHandle style values", async () => {
  AdaptToWebComponent({
    name: "x-tpl-illegal-style",
    setup(_def) {
      return (renderer) => [
        renderer.el(
          "span",
          {
            // @ts-expect-error - style must be TemplateStyleHandle
            style: "color: red;",
          },
          ["x"]
        ),
      ];
    },
  });

  const el = document.createElement("x-tpl-illegal-style") as any;

  expect(() => {
    document.body.appendChild(el);
  }).toThrow();

  // cleanup in case it partially mounted (defensive)
  try {
    el.remove();
  } catch {}
});
