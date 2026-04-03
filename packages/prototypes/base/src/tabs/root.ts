import { definePrototype } from '@proto.ui/core';
import { asTabsRoot } from './as-tabs-root';

const tabsRoot = definePrototype({
  name: 'base-tabs-root',
  setup: () => {
    asTabsRoot();
  },
});

export default tabsRoot;
