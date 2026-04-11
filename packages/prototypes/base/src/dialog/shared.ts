import { createAnatomyFamily } from '@proto.ui/core';
import type { ContextKey } from '@proto.ui/types';

export type DialogContextValue = {
  open: boolean;
  controlled: boolean;
  disabled: boolean;
  alert: boolean;
};

export const DIALOG_FAMILY = createAnatomyFamily('base-dialog', {
  roles: {
    root: { cardinality: { min: 1, max: 1 } },
    trigger: { cardinality: { min: 0, max: 100 } },
    mask: { cardinality: { min: 0, max: 1 } },
    content: { cardinality: { min: 0, max: 1 } },
    title: { cardinality: { min: 0, max: 1 } },
    description: { cardinality: { min: 0, max: 100 } },
    close: { cardinality: { min: 0, max: 100 } },
  },
  relations: [
    { kind: 'contains', parent: 'root', child: 'trigger' },
    { kind: 'contains', parent: 'root', child: 'mask' },
    { kind: 'contains', parent: 'root', child: 'content' },
    { kind: 'contains', parent: 'content', child: 'title' },
    { kind: 'contains', parent: 'content', child: 'description' },
    { kind: 'contains', parent: 'content', child: 'close' },
  ],
});

export const DIALOG_CONTEXT = {
  __brand: 'ContextKey',
  debugName: 'base-dialog',
} as ContextKey<DialogContextValue>;
