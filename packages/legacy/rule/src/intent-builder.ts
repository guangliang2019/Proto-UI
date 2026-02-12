// packages/legacy/rule/src/intent-builder.ts

import type { IntentBuilder, RuleIntent, RuleOp } from "./types";
import type { StyleHandle } from "@proto-ui/core";

export function createIntentBuilder() {
  const ops: RuleOp[] = [];

  const builder: IntentBuilder = {
    feedback: {
      style: {
        use: (...handles: StyleHandle[]) => {
          // v0: no normalization here; rely on core feedback token guards later
          ops.push({ kind: "feedback.style.use", handles });
        },
      },
    },
  };

  const exportIntent = (): RuleIntent => ({ kind: "ops", ops: ops.slice() });

  return { builder, exportIntent };
}
