import { createAnatomyFamily, createFocusGroupKey } from '@proto.ui/core';
import type { ContextKey } from '@proto.ui/types';

export type SelectContextValue = {
  open: boolean;
  controlledOpen: boolean;
  controlledValue: boolean;
  disabled: boolean;
  value: string;
  textValue: string;
  activeValue: string;
  closeOnSelect: boolean;
};

export const SELECT_FAMILY = createAnatomyFamily('base-select', {
  roles: {
    root: { cardinality: { min: 1, max: 1 } },
    trigger: { cardinality: { min: 0, max: 1 } },
    value: { cardinality: { min: 0, max: 1 } },
    content: { cardinality: { min: 0, max: 1 } },
    item: { cardinality: { min: 0, max: 100 } },
  },
  relations: [
    { kind: 'contains', parent: 'root', child: 'trigger' },
    { kind: 'contains', parent: 'root', child: 'value' },
    { kind: 'contains', parent: 'root', child: 'content' },
    { kind: 'contains', parent: 'content', child: 'item' },
  ],
});

export const SELECT_FOCUS_GROUP = createFocusGroupKey({ debugLabel: 'base-select-content' });

export const SELECT_CONTEXT = {
  __brand: 'ContextKey',
  debugName: 'base-select',
} as ContextKey<SelectContextValue>;
