import { describe, it, expect } from "vitest";
import { FeedbackStyleRecorder, tw } from "@proto-ui/core";

describe("core: feedback.style v0 contract", () => {
  it("records tw handles and exports merged tokens deterministically", () => {
    const r = new FeedbackStyleRecorder();

    r.use(tw("bg-red-500 text-white"));
    r.use(tw("bg-blue-500")); // bg- last wins
    r.use(tw("p-2"), tw("p-4")); // spacing group last wins within input order

    const out1 = r.export().tokens;
    const out2 = r.export().tokens;

    // Deterministic snapshot
    expect(out1).toEqual(out2);

    // Semantic merge last-wins per group (bg-, text-, p-)
    expect(out1).toContain("bg-blue-500");
    expect(out1).toContain("text-white");
    expect(out1).toContain("p-4");

    // Earlier conflicting tokens should not remain
    expect(out1).not.toContain("bg-red-500");
    expect(out1).not.toContain("p-2");
  });

  it("unUse removes the exact contribution of its use call", () => {
    const r = new FeedbackStyleRecorder();

    const unUseA = r.use(tw("bg-red-500 text-white"));
    r.use(tw("bg-blue-500")); // overrides bg group
    const outBefore = r.export().tokens;

    // Remove A: should remove text-white, but bg stays (still from bg-blue-500)
    unUseA();
    const outAfter = r.export().tokens;

    expect(outBefore).toContain("bg-blue-500");
    expect(outAfter).toContain("bg-blue-500");

    expect(outBefore).toContain("text-white");
    expect(outAfter).not.toContain("text-white");
  });

  it("rejects forbidden token syntax (variant / selector injection) in v0", () => {
    const r = new FeedbackStyleRecorder();

    // ":" is forbidden (variants/pseudo/selectors)
    expect(() => r.use(tw("data-[disabled]:opacity-50"))).toThrow();

    // selector-ish chars are forbidden
    expect(() => r.use(tw("&:hover"))).toThrow();
    expect(() => r.use(tw(".foo"))).toThrow();
    expect(() => r.use(tw("#id"))).toThrow();
    expect(() => r.use(tw(">div"))).toThrow();
  });
});
