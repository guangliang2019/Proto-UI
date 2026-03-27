import { createAnatomyFamily, type DefHandle } from '@proto.ui/core';
import type { ContextKey, PropsBaseType } from '@proto.ui/types';

export type DropdownContextValue = {
  open: boolean;
  controlled: boolean;
  disabled: boolean;
};

export const DROPDOWN_FAMILY = createAnatomyFamily('base-dropdown');
export const DROPDOWN_CONTEXT = {
  __brand: 'ContextKey',
  debugName: 'base-dropdown',
} as ContextKey<DropdownContextValue>;

export function registerDropdownFamily(def: DefHandle<PropsBaseType, any>): void {
  def.anatomy.family(DROPDOWN_FAMILY, {
    roles: {
      root: { cardinality: { min: 1, max: 1 } },
      trigger: { cardinality: { min: 0, max: 1 } },
      content: { cardinality: { min: 0, max: 1 } },
      item: { cardinality: { min: 0, max: 100 } },
    },
    relations: [
      { kind: 'contains', parent: 'root', child: 'trigger' },
      { kind: 'contains', parent: 'root', child: 'content' },
      { kind: 'contains', parent: 'content', child: 'item' },
    ],
  });
}
