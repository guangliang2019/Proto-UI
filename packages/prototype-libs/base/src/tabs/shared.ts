import { createAnatomyFamily, createFocusGroupKey, type DefHandle } from '@proto-ui/core';
import type { ContextKey, PropsBaseType } from '@proto-ui/types';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivationMode = 'automatic' | 'manual';

export type TabsContextValue = {
  value: string;
  orientation: TabsOrientation;
  activationMode: TabsActivationMode;
  controlled: boolean;
};

export const TABS_FAMILY = createAnatomyFamily('base-tabs');
export const TABS_FOCUS_GROUP = createFocusGroupKey({ debugLabel: 'base-tabs-list' });
export const TABS_CONTEXT = {
  __brand: 'ContextKey',
  debugName: 'base-tabs',
} as ContextKey<TabsContextValue>;

export function registerTabsFamily(def: DefHandle<PropsBaseType, any>): void {
  def.anatomy.family(TABS_FAMILY, {
    roles: {
      root: { cardinality: { min: 1, max: 1 } },
      list: { cardinality: { min: 0, max: 1 } },
      trigger: { cardinality: { min: 0, max: 100 } },
      content: { cardinality: { min: 0, max: 100 } },
    },
    relations: [
      { kind: 'contains', parent: 'root', child: 'list' },
      { kind: 'contains', parent: 'list', child: 'trigger' },
      { kind: 'contains', parent: 'root', child: 'content' },
    ],
  });
}
