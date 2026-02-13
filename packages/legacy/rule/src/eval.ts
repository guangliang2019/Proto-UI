// packages/legacy/rule/src/eval.ts
import type { RuleIR, RulePlanV0, WhenExpr, WhenValue } from './types';
import { mergeTwTokensV0 } from '@proto-ui/core'; // 你已经在 core/feedback 有语义 merge，按真实导出路径改一下

type EvalCtx<Props extends {}> = {
  props: Readonly<Props>;
  // v0: happens gate not executed yet
};

function evalValue<Props extends {}>(v: WhenValue<Props>, ctx: EvalCtx<Props>): any {
  switch (v.type) {
    case 'prop':
      return (ctx.props as any)[v.key];
    case 'state':
      return undefined; // v0 stub
    case 'context':
      return undefined; // v0 stub
  }
}

function evalExpr<Props extends {}>(e: WhenExpr<Props>, ctx: EvalCtx<Props>): boolean {
  switch (e.type) {
    case 'true':
      return true;
    case 'false':
      return false;
    case 'eq':
      return evalValue(e.left, ctx) === e.right;
    case 'not':
      return !evalExpr(e.expr, ctx);
    case 'all':
      // all([]) => true
      for (const it of e.exprs) if (!evalExpr(it, ctx)) return false;
      return true;
    case 'any':
      // any([]) => false
      for (const it of e.exprs) if (evalExpr(it, ctx)) return true;
      return false;
    case 'happens':
      // v0 minimal: accept AST but not execute transient gating yet
      return false;
  }
}

/**
 * Evaluate rules and produce a Plan (style.tokens).
 * - Deterministic ordering: (priority ?? 0), then declaration order
 * - Collect ops, concatenate tokens in order, semantic-merge -> tokens
 */
export function evaluateRulesToPlan<Props extends {}>(
  rules: RuleIR<Props>[],
  props: Readonly<Props>
): RulePlanV0 {
  const ctx: EvalCtx<Props> = { props };

  const active = rules
    .map((r, idx) => ({ r, idx }))
    .filter(({ r }) => evalExpr(r.when, ctx))
    .sort((a, b) => {
      const pa = a.r.priority ?? 0;
      const pb = b.r.priority ?? 0;
      if (pa !== pb) return pa - pb;
      return a.idx - b.idx;
    });

  const tokens: string[] = [];
  for (const { r } of active) {
    if (r.intent.kind !== 'ops') continue;
    for (const op of r.intent.ops) {
      if (op.kind === 'feedback.style.use') {
        for (const h of op.handles) {
          if (!h || h.kind !== 'tw') {
            throw new Error(`[rule] unsupported style handle in v0`);
          }
          tokens.push(...h.tokens);
        }
      }
    }
  }

  const merged = mergeTwTokensV0(tokens);
  return { kind: 'style.tokens', tokens: merged.tokens };
}
