// packages/adapters/web-component/test/props-reprovide.test.ts

import { it, expect } from "vitest";
import { AdaptToWebComponent } from "../src/adapt";
import { setElementProps } from "../src/props";

it("props re-provide triggers watch but does not render until update()", async () => {
  let watched = 0;

  AdaptToWebComponent({
    name: "x-props",
    setup(def) {
      def.props.define({ value: { kind: "number", default: 1 } });

      def.props.watch(["value"], () => {
        watched++;
        // intentionally NOT calling update()
      });

      return (renderer) => [String(renderer.read.props.get().value)];
    },
  });

  const el = document.createElement("x-props") as any;
  document.body.appendChild(el);
  await Promise.resolve();

  expect(el.innerHTML).toBe("1");

  setElementProps(el, { value: 2 });
  await Promise.resolve();

  expect(watched).toBe(1);
  expect(el.innerHTML).toBe("1");

  el.update();
  await Promise.resolve();

  expect(el.innerHTML).toBe("2");
});

it('empty="accept": provided null becomes null, missing still uses default; re-provide does not render until update()', async () => {
  const name = `x-props-accept-${Math.random().toString(16).slice(2)}`;

  let watched = 0;
  let rendered = 0;

  AdaptToWebComponent({
    name,
    setup(def) {
      def.props.define({
        value: { kind: "number", default: 1, empty: "accept" },
      });

      def.props.watch(["value"], () => {
        watched++;
        // intentionally NOT calling update()
      });

      return (renderer) => {
        rendered++;
        return [String(renderer.read.props.get().value)];
      };
    },
  });

  const el = document.createElement(name) as any;
  document.body.appendChild(el);
  await Promise.resolve();

  // ✅ missing still uses default (not null)
  expect(el.innerHTML).toBe("1");
  expect(rendered).toBe(1);

  // provided empty => accept => resolved null, but DOM won't change until update()
  setElementProps(el, { value: null });
  await Promise.resolve();

  expect(watched).toBe(1);
  expect(rendered).toBe(1);
  expect(el.innerHTML).toBe("1");

  el.update();
  await Promise.resolve();

  expect(rendered).toBe(2);
  expect(el.innerHTML).toBe("null");
});
