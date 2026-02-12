// packages/modules/rule/src/intent-builder.ts
import type {
  IntentBuilder,
  RuleIntent,
  RuleOp,
  StateIntentBuilder,
} from "./types";
import type { StyleHandle, OwnedStateHandle, BorrowedStateHandle } from "@proto-ui/core";
import type { PropsBaseType } from "@proto-ui/types";

export function createIntentBuilder() {
  const ops: RuleOp[] = [];

  const builder: IntentBuilder = {
    feedback: {
      style: {
        use: (...handles: StyleHandle[]) => {
          ops.push({ kind: "feedback.style.use", handles });
        },
      },
    },
    state: <T>(
      handle: OwnedStateHandle<T> | BorrowedStateHandle<T, PropsBaseType>
    ): StateIntentBuilder<T> => ({
      be(value: T) {
        ops.push({
          kind: "state.set",
          handle: handle as any,
          value,
        });
      },
    }),
  };

  const exportIntent = (): RuleIntent => ({ kind: "ops", ops: ops.slice() });

  return { builder, exportIntent };
}
