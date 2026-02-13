// packages/modules/rule/src/compile.ts
import type { RuleIR, RuleSpec, RuleOp } from './types';
import { createWhenBuilder } from './when-builder';
import { createIntentBuilder } from './intent-builder';

function attachDefaultReasons(ops: RuleOp[], spec: RuleSpec<any>): RuleOp[] {
  return ops.map((op, idx) => {
    if (op.kind !== 'state.set') return op;
    if (op.reason !== undefined) return op;
    return {
      ...op,
      reason: {
        kind: 'rule',
        label: spec.label,
        note: spec.note,
        opIndex: idx,
      },
    };
  });
}

/**
 * Compile a RuleSpec into pure-data RuleIR.
 * v0: must be called during setup by runtime's def.rule.
 */
export function compileRule<Props extends {}>(
  spec: RuleSpec<Props>,
  opt?: {
    registerStateHandle?: (id: any, handle: any) => void;
  }
): Omit<RuleIR<Props>, 'id'> {
  const { w, getDeps } = createWhenBuilder<Props>({
    onStateHandle: opt?.registerStateHandle,
  });
  const when = spec.when(w);

  const { builder, exportIntent } = createIntentBuilder();
  spec.intent(builder);

  const intent = exportIntent();
  const ops = attachDefaultReasons(intent.ops, spec);

  return {
    label: spec.label,
    note: spec.note,
    deps: getDeps(),
    when,
    intent: { kind: 'ops', ops },
  };
}
