import { describe, it, expect } from "vitest";
import type { Prototype } from "@proto-ui/core";
import { AdaptToWebComponent } from "@proto-ui/adapters.web-component";

function getAttr(el: Element, name: string) {
  return el.getAttribute(name);
}

function getVar(el: HTMLElement, name: string) {
  return el.style.getPropertyValue(name);
}

describe("expose-state web extension", () => {
  it("maps bool to data-attr only", async () => {
    const P: Prototype = {
      name: "x-esw-bool",
      setup(def) {
        const s = def.state.bool("btn.disabled", false);
        def.expose("disabled", s);
        def.lifecycle.onMounted(() => s.set(true));
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement("x-esw-bool") as HTMLElement;
    document.body.appendChild(el);

    await Promise.resolve();

    expect(getAttr(el, "data-btn-disabled")).toBe("");
    expect(getVar(el, "--pui-btn-disabled")).toBe("");
  });

  it("maps enum to data-attr only", () => {
    const P: Prototype = {
      name: "x-esw-enum",
      setup(def) {
        const s = def.state.enum("btn.size", "md", { options: ["sm", "md", "lg"] });
        def.expose("size", s);
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement("x-esw-enum") as HTMLElement;
    document.body.appendChild(el);

    expect(getAttr(el, "data-btn-size")).toBe("md");
    expect(getVar(el, "--pui-btn-size")).toBe("");
  });

  it("maps number.discrete to attr + css var", () => {
    const P: Prototype = {
      name: "x-esw-disc",
      setup(def) {
        const s = def.state.numberDiscrete("list.index", 3);
        def.expose("index", s);
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement("x-esw-disc") as HTMLElement;
    document.body.appendChild(el);

    expect(getAttr(el, "data-list-index")).toBe("3");
    expect(getVar(el, "--pui-list-index")).toBe("3");
  });

  it("maps number.range to css var only", () => {
    const P: Prototype = {
      name: "x-esw-range",
      setup(def) {
        const s = def.state.numberRange("slider.value", 0.5, { min: 0, max: 1 });
        def.expose("value", s);
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement("x-esw-range") as HTMLElement;
    document.body.appendChild(el);

    expect(getAttr(el, "data-slider-value")).toBe(null);
    expect(getVar(el, "--pui-slider-value")).toBe("0.5");
  });

  it("allows mode overrides for string var + continuous attr", () => {
    const P: Prototype = {
      name: "x-esw-mode",
      setup(def) {
        const s1 = def.state.string("mode.label", "hi");
        const s2 = def.state.numberRange("mode.value", 0.2, { min: 0, max: 1 });
        def.expose("label", s1);
        def.expose("value", s2);
        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P, {
      exposeStateWebMode: {
        allowStringVar: true,
        allowContinuousAttr: true,
      },
    });

    const el = document.createElement("x-esw-mode") as HTMLElement;
    document.body.appendChild(el);

    expect(getAttr(el, "data-mode-label")).toBe("hi");
    expect(getVar(el, "--pui-mode-label")).toBe("hi");

    expect(getAttr(el, "data-mode-value")).toBe("0.2");
    expect(getVar(el, "--pui-mode-value")).toBe("0.2");
  });
});
