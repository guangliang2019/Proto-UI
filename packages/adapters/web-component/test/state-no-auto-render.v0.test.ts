// packages/adapters/web-component/test/state-no-auto-render.v0.test.ts
import { it, expect } from "vitest";
import { AdaptToWebComponent } from "../src/adapt";

/**
 * Adapter Contract (v0, WC): state does NOT trigger render automatically.
 *
 * We assert:
 * - created-time set affects first render (because created happens before first commit in runtime contract)
 * - mounted-time set does NOT re-render until el.update() is called
 */
it("state set does not re-render until update(); created-time set affects initial render", async () => {
  const name = `x-state-${Math.random().toString(16).slice(2)}`;

  let s: any;

  AdaptToWebComponent({
    name,
    setup(def) {
      s = def.state.numberDiscrete("count", 0, {});
      def.lifecycle.onCreated(() => {
        s.set(1);
      });
      def.lifecycle.onMounted(() => {
        s.set(2);
        // intentionally NOT calling run.update()
      });

      return (r) => [String(s.get())];
    },
  });

  const el = document.createElement(name) as any;
  document.body.appendChild(el);

  // Let initial mount pass
  await Promise.resolve();
  await Promise.resolve();

  // created set(1) must be visible in first commit
  expect(el.innerHTML).toBe("1");

  // mounted set(2) must NOT auto render
  await Promise.resolve();
  expect(el.innerHTML).toBe("1");

  // explicit update => render sees latest state
  el.update();
  await Promise.resolve();
  expect(el.innerHTML).toBe("2");
});
