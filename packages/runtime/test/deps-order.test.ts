// packages/runtime/test/orchestrator/deps-order.test.ts
import { describe, it, expect } from "vitest";
import { RuntimeModuleOrchestrator } from "../src/orchestrator/module-orchestrator";
import type { ModuleDef } from "@proto-ui/modules.base";
import type { ExecPhase } from "@proto-ui/modules.base";
import type { ModuleFacade } from "@proto-ui/core";

/**
 * These tests are intentionally "unit tests" (not contract tests).
 * They only pin the behavior of RuntimeModuleOrchestrator as a module assembler:
 * - deps ordering (topo sort)
 * - missing deps should throw
 * - cycle should throw
 */

function mkModule(
  name: string,
  calls: string[],
  opt?: Partial<Pick<ModuleDef, "deps" | "optionalDeps">>
): ModuleDef {
  return {
    name,
    ...(opt ?? {}),
    create: () => {
      calls.push(name);

      // Minimal module instance that satisfies runtime expectations.
      // No caps usage, no hooks, no ports.
      return {
        name,
        scope: "instance",
        facade: {} as ModuleFacade,
        hooks: {},
      } as any;
    },
  };
}

describe("runtime: RuntimeModuleOrchestrator deps ordering (unit)", () => {
  it("topo sort: deps must be created before dependents", () => {
    const calls: string[] = [];
    let phase: ExecPhase = "setup";

    const hub = new RuntimeModuleOrchestrator(
      { prototypeName: "t-hub-deps-order", getPhase: () => phase },
      [
        // Intentionally shuffled order:
        mkModule("A", calls, { deps: ["B"] }),
        mkModule("C", calls),
        mkModule("B", calls),
      ]
    );

    // avoid unused warning; also ensures hub constructed successfully
    expect(hub.getFacades()).toBeTruthy();

    // B must appear before A
    const iA = calls.indexOf("A");
    const iB = calls.indexOf("B");
    expect(iB).toBeGreaterThanOrEqual(0);
    expect(iA).toBeGreaterThanOrEqual(0);
    expect(iB).toBeLessThan(iA);

    // C has no deps; we don't require a specific position
    expect(calls).toContain("C");
  });

  it("optionalDeps: if present, must be created before dependent; if absent, ignored", () => {
    const calls: string[] = [];
    let phase: ExecPhase = "setup";

    // Case 1: optional dep exists -> order enforced
    calls.length = 0;
    new RuntimeModuleOrchestrator(
      { prototypeName: "t-hub-optional-present", getPhase: () => phase },
      [mkModule("A", calls, { optionalDeps: ["B"] }), mkModule("B", calls)]
    );
    expect(calls.indexOf("B")).toBeLessThan(calls.indexOf("A"));

    // Case 2: optional dep missing -> no throw
    calls.length = 0;
    expect(() => {
      new RuntimeModuleOrchestrator(
        { prototypeName: "t-hub-optional-missing", getPhase: () => phase },
        [mkModule("A", calls, { optionalDeps: ["B"] })]
      );
    }).not.toThrow();
  });

  it("missing hard dep must throw", () => {
    const calls: string[] = [];
    let phase: ExecPhase = "setup";

    expect(() => {
      new RuntimeModuleOrchestrator(
        { prototypeName: "t-hub-missing-dep", getPhase: () => phase },
        [mkModule("A", calls, { deps: ["B"] })]
      );
    }).toThrow(/missing module dependency/i);
  });

  it("cycle must throw", () => {
    const calls: string[] = [];
    let phase: ExecPhase = "setup";

    expect(() => {
      new RuntimeModuleOrchestrator(
        { prototypeName: "t-hub-cycle", getPhase: () => phase },
        [
          mkModule("A", calls, { deps: ["B"] }),
          mkModule("B", calls, { deps: ["A"] }),
        ]
      );
    }).toThrow(/dependency cycle/i);
  });
});
