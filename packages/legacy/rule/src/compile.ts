// packages/legacy/rule/src/compile.ts
import type { RuleIR, RuleSpec } from './types';
import { createWhenBuilder } from './when-builder';
import { createIntentBuilder } from './intent-builder';

/**
 * Compile a RuleSpec into pure-data RuleIR.
 * v0: must be called during setup by runtime's def.rule.
 */
export function compileRule<Props extends {}>(spec: RuleSpec<Props>): RuleIR<Props> {
  const { w, getDeps } = createWhenBuilder<Props>();
  const when = spec.when(w);

  const { builder, exportIntent } = createIntentBuilder();
  spec.intent(builder);

  return {
    label: spec.label,
    note: spec.note,
    priority: spec.priority,
    deps: getDeps(),
    when,
    intent: exportIntent(),
  };
}
