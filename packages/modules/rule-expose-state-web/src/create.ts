// packages/modules/rule-expose-state-web/src/create.ts
import { createModule, defineModule, ModuleBase } from "@proto-ui/modules.base";
import type { ModuleFactoryArgs, ModuleDeps } from "@proto-ui/modules.base";
import type { ProtoPhase, StyleHandle } from "@proto-ui/core";
import type { WhenExpr, RuleIR, RulePort } from "@proto-ui/modules.rule";
import type {
  ExposeStateWebPort,
  ExposeStateWebBinding,
} from "@proto-ui/modules.expose-state-web";
import type { FeedbackPort } from "@proto-ui/modules.feedback";
import type { RuleExposeStateWebFacade, RuleExposeStateWebModule } from "./types";

type Condition = { stateId: any; literal: string | number | boolean | null };
type Candidate = {
  id: number;
  order: number;
  conditions: Condition[];
  tokens: string[];
};

function isStateOnlyDeps<Props>(rule: RuleIR<Props>): boolean {
  return rule.deps.every((d) => d.kind === "state");
}

function extractConditions<Props>(
  expr: WhenExpr<Props>
): Condition[] | null {
  switch (expr.type) {
    case "eq":
      if (expr.left.type !== "state") return null;
      return [{ stateId: expr.left.id, literal: expr.right }];
    case "all": {
      const all: Condition[] = [];
      for (const e of expr.exprs) {
        const c = extractConditions(e);
        if (!c) return null;
        all.push(...c);
      }
      return all;
    }
    default:
      return null;
  }
}

function stripDataPrefix(attr: string): string {
  return attr.startsWith("data-") ? attr.slice("data-".length) : attr;
}

function buildVariant(
  binding: ExposeStateWebBinding,
  literal: Condition["literal"]
): string | null {
  const attr = binding.attr;
  if (!attr) return null;

  const key = stripDataPrefix(attr);

  switch (binding.kind) {
    case "bool":
      if (literal !== true) return null;
      return `data-[${key}]`;
    case "enum":
    case "string":
    case "number.discrete": {
      if (literal === null) return null;
      return `data-[${key}=${String(literal)}]`;
    }
    case "number.range":
    default:
      return null;
  }
}

class RuleExposeStateWebImpl extends ModuleBase {
  private readonly rulePort: RulePort<any>;
  private readonly exposeStateWeb: ExposeStateWebPort;
  private readonly feedbackPort: FeedbackPort;

  private candidates: Candidate[] = [];
  private candidatesReady = false;
  private optimizedIds = new Set<number>();

  constructor(caps: any, deps: ModuleDeps) {
    super(caps);
    this.rulePort = deps.requirePort<RulePort<any>>("rule");
    this.exposeStateWeb = deps.requirePort<ExposeStateWebPort>(
      "expose-state-web"
    );
    this.feedbackPort = deps.requirePort<FeedbackPort>("feedback");

    this.rulePort.registerExtension({
      transformRules: (rules) =>
        rules.filter((r) => !this.optimizedIds.has((r as any).id)),
    });
  }

  override onProtoPhase(phase: ProtoPhase): void {
    super.onProtoPhase(phase);
    if (phase === "mounted") this.tryApply();
  }

  protected override onCapsEpoch(_epoch: number): void {
    this.tryApply();
  }

  afterRenderCommit(): void {
    this.tryApply();
  }

  private collectCandidates(): Candidate[] {
    const ir = this.rulePort.exportIR();
    const out: Candidate[] = [];
    let order = 0;

    for (const r of ir) {
      if (!isStateOnlyDeps(r)) continue;
      const conditions = extractConditions(r.when);
      if (!conditions || conditions.length === 0) continue;

      if (r.intent.kind !== "ops") continue;
      const tokens: string[] = [];
      let ok = true;
      for (const op of r.intent.ops) {
        if (op.kind !== "feedback.style.use") {
          ok = false;
          break;
        }
        for (const h of op.handles) {
          if (!h || h.kind !== "tw") {
            ok = false;
            break;
          }
          tokens.push(...h.tokens);
        }
      }
      if (!ok || tokens.length === 0) continue;

      out.push({ id: (r as any).id, order: order++, conditions, tokens });
    }

    return out;
  }

  private tryApply(): void {
    const map = this.exposeStateWeb.getExposedStateMap();
    if (!map || map.size === 0) return;

    if (!this.candidatesReady) {
      this.candidates = this.collectCandidates();
      this.candidatesReady = true;
    }
    if (this.candidates.length === 0) return;

    const appliedIds: number[] = [];
    for (const c of this.candidates) {
      if (this.optimizedIds.has(c.id)) continue;

      const variants: string[] = [];
      let ok = true;
      for (const cond of c.conditions) {
        const binding = map.get(String(cond.stateId));
        if (!binding) {
          ok = false;
          break;
        }
        if (binding.kind === "number.range") {
          ok = false;
          break;
        }
        const v = buildVariant(binding, cond.literal);
        if (!v) {
          ok = false;
          break;
        }
        variants.push(v);
      }

      if (!ok || variants.length === 0) continue;

      const prefix = variants.join(":");
      const tokens = c.tokens.map((t) => `${prefix}:${t}`);
      const handle: StyleHandle = { kind: "tw", tokens };
      this.feedbackPort.useStyleUnsafe(handle);
      appliedIds.push(c.id);
    }

    for (const id of appliedIds) this.optimizedIds.add(id);
  }
}

export function createRuleExposeStateWebModule(
  ctx: ModuleFactoryArgs
): RuleExposeStateWebModule {
  const { init, caps, deps } = ctx;

  return createModule<
    "rule-expose-state-web",
    "instance",
    RuleExposeStateWebFacade
  >({
    name: "rule-expose-state-web",
    scope: "instance",
    init,
    caps,
    deps,
    build: ({ caps, deps }) => {
      const impl = new RuleExposeStateWebImpl(caps, deps);
      return {
        facade: {},
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
          afterRenderCommit: () => impl.afterRenderCommit(),
        },
      };
    },
  }) as any;
}

export const RuleExposeStateWebModuleDef = defineModule({
  name: "rule-expose-state-web",
  deps: ["rule", "expose-state-web", "feedback"],
  create: createRuleExposeStateWebModule,
});
