import { createAnatomyFamily, createFocusGroupKey } from '@proto.ui/core';
import type { ContextKey } from '@proto.ui/types';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivationMode = 'automatic' | 'manual';

export type TabsContextValue = {
  value: string;
  activeValue: string;
  orientation: TabsOrientation;
  activationMode: TabsActivationMode;
  controlled: boolean;
};

export const TABS_FAMILY = createAnatomyFamily('base-tabs', {
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
export const TABS_FOCUS_GROUP = createFocusGroupKey({ debugLabel: 'base-tabs-list' });
export const TABS_CONTEXT = {
  __brand: 'ContextKey',
  debugName: 'base-tabs',
} as ContextKey<TabsContextValue>;
