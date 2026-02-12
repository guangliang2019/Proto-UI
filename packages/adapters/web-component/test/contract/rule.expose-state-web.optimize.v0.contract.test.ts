import { describe, it, expect } from "vitest";
import type { Prototype } from "@proto-ui/core";
import { tw } from "@proto-ui/core";
import { AdaptToWebComponent } from "../../src/adapt";

describe("adapter-web-component: rule expose-state-web optimization (v0)", () => {
  it("short-circuits to selector token when state is exposed and non-continuous", async () => {
    const proto: Prototype = {
      name: "x-rule-esw-opt",
      setup(def: any) {
        const disabled = def.state.bool("btn.disabled", false);
        def.expose("disabled", disabled);

        def.rule({
          when: (w: any) => w.state(disabled).eq(true),
          intent: (i: any) => i.feedback.style.use(tw("opacity-50")),
        });

        def.lifecycle.onMounted(() => {
          disabled.set(true);
        });

        return (r: any) => [r.el("div", {}, ["ok"])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    // selector-style token should be present (setup-time optimization)
    expect(el.classList.contains("data-[btn-disabled]:opacity-50")).toBe(true);
    // runtime plain token should not be used
    expect(el.classList.contains("opacity-50")).toBe(false);

    // expose-state-web should still toggle attr
    expect(el.getAttribute("data-btn-disabled")).toBe("");

    document.body.removeChild(el);
  });

  it("does not optimize when state is continuous number (number.range)", async () => {
    const proto: Prototype = {
      name: "x-rule-esw-range",
      setup(def: any) {
        const value = def.state.numberRange("slider.value", 0.5, {
          min: 0,
          max: 1,
        });
        def.expose("value", value);

        def.rule({
          when: (w: any) => w.state(value).eq(0.5),
          intent: (i: any) => i.feedback.style.use(tw("opacity-50")),
        });

        return (r: any) => [r.el("div", {}, ["ok"])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    // fallback to runtime style token
    expect(el.classList.contains("opacity-50")).toBe(true);
    // no selector token for continuous number
    expect(el.classList.contains("data-[slider-value=0.5]:opacity-50")).toBe(
      false
    );

    document.body.removeChild(el);
  });
});
