import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asFocusGroup } from '@proto.ui/hooks';
import { asFocusRoving } from '../behaviors';
import { TABS_CONTEXT, TABS_FAMILY, TABS_FOCUS_GROUP } from './shared';
import type { TabsListAsHookContract, TabsListExposes, TabsListProps } from './types';

function setupTabsList(def: DefHandle<TabsListProps, TabsListExposes>): void {
  def.anatomy.claim(TABS_FAMILY, { role: 'list' });
  let activeValue = '';
  let selectedValue = '';

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
    navigation: 'none',
    orientation: 'horizontal',
    entry: 'manual',
  });
  asFocusRoving({
    family: TABS_FAMILY,
    itemRole: 'trigger',
    loop: false,
    skipDisabled: true,
    getId: (snapshot) => {
      const value = snapshot.value;
      return typeof value === 'string' && value ? value : null;
    },
    getActiveId: () => activeValue,
    getCurrentId: () => selectedValue,
    exposeFocusCurrentMethodKey: 'focusSelected',
  });

  def.context.subscribe(TABS_CONTEXT, (_run, next) => {
    activeValue = next.activeValue ?? '';
    selectedValue = next.value ?? '';
  });

  def.lifecycle.onMounted((run) => {
    const ctx = run.context.read(TABS_CONTEXT);
    activeValue = ctx.activeValue ?? '';
    selectedValue = ctx.value ?? '';
  });

  def.lifecycle.onUnmounted(() => {
    activeValue = '';
    selectedValue = '';
  });
}

export const asTabsList = defineAsHook<TabsListProps, TabsListExposes, TabsListAsHookContract>({
  name: 'as-tabs-list',
  mode: 'once',
  setup: setupTabsList,
});

const tabsList = definePrototype({
  name: 'base-tabs-list',
  setup: setupTabsList,
});

export default tabsList;
