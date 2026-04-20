import { cap } from '@proto.ui/core';

export type ExposeStateHostSink = (exposes: Record<string, unknown>) => void;

export const EXPOSE_STATE_SET_EXPOSES_CAP = cap<ExposeStateHostSink>(
  '@proto.ui/expose-state/setExposes'
);
