// packages/legacy/rule/test/compile.v0.test.ts
import { describe, it, expect } from "vitest";
import { tw } from "@proto-ui/core";
import { compileRule } from "@proto-ui/rule"; // or "../src/compile"
import type { RuleIR } from "@proto-ui/rule";

describe("rule.compile (v0)", () => {
  it("collects prop deps (dedup + stable first-seen order)", () => {
    type Props = { disabled: boolean; size: "sm" | "md" };

    const spec = {
      label: "deps",
      when: (w: any) =>
        w.all(
          w.prop("disabled").eq(true),
          w.prop("disabled").eq(true), // duplicate
          w.prop("size").eq("sm")
        ),
      intent: (i: any) => {
        i.feedback.style.use(tw("opacity-50"));
      },
    };

    const ir: RuleIR<Props> = compileRule<Props>(spec as any);

    expect(ir.deps).toEqual([
      { kind: "prop", key: "disabled" },
      { kind: "prop", key: "size" },
    ]);
  });

  it("compiles intent into ops list (feedback.style.use)", () => {
    type Props = {};

    const ir: RuleIR<Props> = compileRule<Props>({
      when: (w: any) => w.t(),
      intent: (i: any) => {
        i.feedback.style.use(tw("bg-red-500 text-white"));
      },
    } as any);

    expect(ir.intent.kind).toBe("ops");
    expect(ir.intent.ops).toHaveLength(1);

    const op = ir.intent.ops[0];
    expect(op.kind).toBe("feedback.style.use");
    expect(op.handles).toHaveLength(1);
    expect(op.handles[0].kind).toBe("tw");
    expect(op.handles[0].tokens).toEqual(["bg-red-500", "text-white"]);
  });

  it("preserves metadata: label/note/priority", () => {
    type Props = {};

    const ir = compileRule<Props>({
      label: "L",
      note: "N",
      priority: 7,
      when: (w: any) => w.t(),
      intent: (i: any) => i.feedback.style.use(tw("opacity-50")),
    } as any);

    expect(ir.label).toBe("L");
    expect(ir.note).toBe("N");
    expect(ir.priority).toBe(7);
  });

  it("supports multiple intent ops; keeps declaration order inside one rule", () => {
    type Props = {};

    const ir = compileRule<Props>({
      when: (w: any) => w.t(),
      intent: (i: any) => {
        i.feedback.style.use(tw("bg-red-500"));
        i.feedback.style.use(tw("opacity-50"));
      },
    } as any);

    expect(ir.intent.kind).toBe("ops");
    expect(ir.intent.ops).toHaveLength(2);
    expect(ir.intent.ops[0].kind).toBe("feedback.style.use");
    expect(ir.intent.ops[1].kind).toBe("feedback.style.use");
    expect(ir.intent.ops[0].handles[0].tokens).toEqual(["bg-red-500"]);
    expect(ir.intent.ops[1].handles[0].tokens).toEqual(["opacity-50"]);
  });

  it("deps include event dep when builder.event(type) is used", () => {
    type Props = {};

    const ir = compileRule<Props>({
      when: (w: any) => w.event("click").happens(),
      intent: (i: any) => i.feedback.style.use(tw("opacity-50")),
    } as any);

    expect(ir.deps).toEqual([{ kind: "event", type: "click" }]);
    expect(ir.when).toEqual({ type: "happens", eventType: "click" });
  });
});
