// packages/modules/expose/src/caps.ts
import { cap } from "@proto-ui/core";

export type ExposeHostSink = (exposes: Record<string, unknown>) => void;

export const EXPOSE_SET_EXPOSES_CAP = cap<ExposeHostSink>(
  "@proto-ui/expose/setExposes"
);
