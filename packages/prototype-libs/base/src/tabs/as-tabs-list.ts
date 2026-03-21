import { asFocusGroup, defineAsHook } from '@proto-ui/core';
import { TABS_FAMILY, TABS_FOCUS_GROUP, registerTabsFamily } from './shared';
import type { TabsListAsHookContract, TabsListExposes, TabsListProps } from './types';

export const asTabsList = defineAsHook<TabsListProps, TabsListExposes, TabsListAsHookContract>({
  name: 'as-tabs-list',
  setup(def) {
    registerTabsFamily(def as any);
    def.anatomy.claim(TABS_FAMILY, { role: 'list' });

    def.props.define({
      orientation: { type: 'string', empty: 'fallback', enum: ['horizontal', 'vertical'] },
      loop: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      orientation: 'horizontal',
      loop: false,
    });

    asFocusGroup({
      key: TABS_FOCUS_GROUP,
      navigation: 'arrow',
      orientation: 'horizontal',
      entry: 'selected',
    });
    const group = asFocusGroup();
    def.expose.method('focusFirst', () => group.focusFirst());
    def.expose.method('focusLast', () => group.focusLast());
    def.expose.method('focusNext', () => group.focusNext());
    def.expose.method('focusPrev', () => group.focusPrev());
  },
});
