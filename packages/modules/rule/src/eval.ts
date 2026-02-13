// packages/modules/rule/src/eval.ts
import type { RuleIR, RulePlanV0, RuleEvalCtx, WhenExpr, WhenValue } from './types';
import { mergeTwTokensV0 } from '@proto-ui/core';

function evalValue<Props extends {}>(v: WhenValue<Props>, ctx: RuleEvalCtx<Props>): any {
  switch (v.type) {
    case 'prop':
      return (ctx.props as any)[v.key];
    case 'state':
      return ctx.readState ? ctx.readState(v.id) : undefined;
    case 'context':
      return ctx.readContext ? ctx.readContext(v.key) : undefined;
  }
}

function evalExpr<Props extends {}>(e: WhenExpr<Props>, ctx: RuleEvalCtx<Props>): boolean {
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
      for (const it of e.exprs) if (!evalExpr(it, ctx)) return false;
      return true;
    case 'any':
      for (const it of e.exprs) if (evalExpr(it, ctx)) return true;
      return false;
  }
}

/**
 * Evaluate rules and produce a Plan (style.tokens).
 * - Deterministic ordering: declaration order
 * - Collect ops, concatenate tokens in order, semantic-merge -> tokens
 */
export function evaluateRulesToPlan<Props extends {}>(
  rules: RuleIR<Props>[],
  ctx: RuleEvalCtx<Props>
): RulePlanV0 {
  const active = rules
    .map((r, idx) => ({ r, idx }))
    .filter(({ r }) => evalExpr(r.when, ctx))
    .sort((a, b) => a.idx - b.idx);

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
