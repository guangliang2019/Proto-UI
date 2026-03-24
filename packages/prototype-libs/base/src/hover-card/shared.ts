import { createAnatomyFamily, type DefHandle } from '@proto-ui/core';
import type { ContextKey, PropsBaseType } from '@proto-ui/types';

export type HoverCardContextValue = {
  open: boolean;
  controlled: boolean;
  disabled: boolean;
  triggerHovered: boolean;
  triggerFocused: boolean;
  contentHovered: boolean;
  contentFocused: boolean;
};

export const HOVER_CARD_FAMILY = createAnatomyFamily('base-hover-card');
export const HOVER_CARD_CONTEXT = {
  __brand: 'ContextKey',
  debugName: 'base-hover-card',
} as ContextKey<HoverCardContextValue>;

export function registerHoverCardFamily(def: DefHandle<PropsBaseType, any>): void {
  def.anatomy.family(HOVER_CARD_FAMILY, {
    roles: {
      root: { cardinality: { min: 1, max: 1 } },
      trigger: { cardinality: { min: 0, max: 1 } },
      content: { cardinality: { min: 0, max: 1 } },
    },
    relations: [
      { kind: 'contains', parent: 'root', child: 'trigger' },
      { kind: 'contains', parent: 'root', child: 'content' },
    ],
  });
}
