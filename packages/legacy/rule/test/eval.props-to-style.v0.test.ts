// packages/legacy/rule/test/eval.props-to-style.v0.test.ts
import { describe, it, expect } from 'vitest';
import { tw } from '@proto-ui/core';
import { compileRule, evaluateRulesToPlan } from '@proto-ui/rule';
import type { RuleIR, RulePlanV0 } from '@proto-ui/rule';

describe('rule.eval props->style (v0)', () => {
  it('inactive rule yields empty tokens', () => {
    type Props = { disabled: boolean };

    const r: RuleIR<Props> = compileRule<Props>({
      when: (w: any) => w.prop('disabled').eq(true),
      intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
    } as any);

    const plan: RulePlanV0 = evaluateRulesToPlan<Props>([r], {
      disabled: false,
    } as any);

    expect(plan.kind).toBe('style.tokens');
    expect(plan.tokens).toEqual([]);
  });

  it('active rule yields semantic-merged tokens from its ops', () => {
    type Props = { disabled: boolean };

    const r: RuleIR<Props> = compileRule<Props>({
      when: (w: any) => w.prop('disabled').eq(true),
      intent: (i: any) => i.feedback.style.use(tw('opacity-50 bg-red-500 bg-blue-500')),
    } as any);

    const plan: RulePlanV0 = evaluateRulesToPlan<Props>([r], {
      disabled: true,
    } as any);

    // merge: bg-* last wins
    expect(plan.kind).toBe('style.tokens');
    expect(plan.tokens).toContain('opacity-50');
    expect(plan.tokens).toContain('bg-blue-500');
    expect(plan.tokens).not.toContain('bg-red-500');
  });

  it('ordering: priority asc, then declaration order (later wins via merge)', () => {
    type Props = {};

    const r1 = compileRule<Props>({
      label: 'r1',
      priority: 0,
      when: (w: any) => w.t(),
      intent: (i: any) => i.feedback.style.use(tw('bg-red-500')),
    } as any);

    const r2 = compileRule<Props>({
      label: 'r2',
      priority: 10,
      when: (w: any) => w.t(),
      intent: (i: any) => i.feedback.style.use(tw('bg-blue-500')),
    } as any);

    const plan = evaluateRulesToPlan<Props>([r1, r2], {} as any);

    expect(plan.kind).toBe('style.tokens');
    // higher priority applies later => wins
    expect(plan.tokens).toContain('bg-blue-500');
    expect(plan.tokens).not.toContain('bg-red-500');
  });

  it('ordering: same priority uses declaration order (later wins)', () => {
    type Props = {};

    const r1 = compileRule<Props>({
      priority: 0,
      when: (w: any) => w.t(),
      intent: (i: any) => i.feedback.style.use(tw('bg-red-500')),
    } as any);

    const r2 = compileRule<Props>({
      priority: 0,
      when: (w: any) => w.t(),
      intent: (i: any) => i.feedback.style.use(tw('bg-blue-500')),
    } as any);

    const plan = evaluateRulesToPlan<Props>([r1, r2], {} as any);

    expect(plan.kind).toBe('style.tokens');
    expect(plan.tokens).toContain('bg-blue-500');
    expect(plan.tokens).not.toContain('bg-red-500');
  });

  it('determinism: same inputs yield same outputs', () => {
    type Props = { disabled: boolean; tone: string };

    const rules: RuleIR<Props>[] = [
      compileRule<Props>({
        priority: 0,
        when: (w: any) => w.prop('disabled').eq(true),
        intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
      } as any),
      compileRule<Props>({
        priority: 1,
        when: (w: any) => w.prop('tone').eq('danger'),
        intent: (i: any) => i.feedback.style.use(tw('bg-red-500 text-white')),
      } as any),
    ];

    const props = { disabled: true, tone: 'danger' };

    const a = evaluateRulesToPlan<Props>(rules, props as any);
    const b = evaluateRulesToPlan<Props>(rules, props as any);

    expect(a).toEqual(b);
  });
});
