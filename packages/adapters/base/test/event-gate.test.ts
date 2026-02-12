import { describe, it, expect } from "vitest";
import { createEventGate } from "../src/gate/event-gate";

describe("adapter-base: event-gate", () => {
  it("enable/disable toggles effectiveness; disposed always ineffective", () => {
    const g = createEventGate();

    expect(g.isEnabled()).toBe(false);
    expect(() => g.assertEnabled()).toThrow();

    g.enable();
    expect(g.isEnabled()).toBe(true);
    expect(() => g.assertEnabled()).not.toThrow();

    g.disable();
    expect(g.isEnabled()).toBe(false);
    expect(() => g.assertEnabled()).toThrow();

    g.enable();
    expect(g.isEnabled()).toBe(true);

    g.dispose();
    expect(g.isEnabled()).toBe(false);
    expect(() => g.assertEnabled()).toThrow();

    // enable after dispose is ignored
    g.enable();
    expect(g.isEnabled()).toBe(false);
  });

  it("assertEnabled includes hint in error message", () => {
    const g = createEventGate();
    expect(() => g.assertEnabled("click")).toThrow(
      "[EventGate] event is not effective: click"
    );
  });
});
