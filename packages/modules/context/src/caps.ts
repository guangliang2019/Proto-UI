// packages/modules/context/src/caps.ts
import { cap } from "@proto-ui/core";

export type ContextInstanceToken = unknown;

export type ContextParentGetter = (
  instance: ContextInstanceToken
) => ContextInstanceToken | null;

export const CONTEXT_INSTANCE_TOKEN_CAP = cap<ContextInstanceToken>(
  "@proto-ui/context/instanceToken"
);

export const CONTEXT_PARENT_CAP = cap<ContextParentGetter>(
  "@proto-ui/context/getParent"
);
