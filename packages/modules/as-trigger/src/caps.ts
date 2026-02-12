import { cap } from "@proto-ui/core";
import type { Prototype } from "@proto-ui/core";

export type AsTriggerInstanceToken = unknown;

export type AsTriggerParentGetter = (
  instance: AsTriggerInstanceToken
) => AsTriggerInstanceToken | null;

export type AsTriggerPrototypeGetter = (
  instance: AsTriggerInstanceToken
) => Prototype | null;

export const AS_TRIGGER_INSTANCE_CAP = cap<AsTriggerInstanceToken>(
  "@proto-ui/as-trigger/instanceToken"
);

export const AS_TRIGGER_PARENT_CAP = cap<AsTriggerParentGetter>(
  "@proto-ui/as-trigger/getParent"
);

export const AS_TRIGGER_GET_PROTO_CAP = cap<AsTriggerPrototypeGetter>(
  "@proto-ui/as-trigger/getPrototype"
);
