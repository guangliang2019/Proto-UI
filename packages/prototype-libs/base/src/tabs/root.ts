import { definePrototype } from '@proto-ui/core';
import { asTabsRoot } from './as-tabs-root';

const tabsRoot = definePrototype({
  name: 'base-tabs-root',
  setup: () => {
    asTabsRoot();
    return (r) => r.el('div', r.r.slot());
  },
});

export default tabsRoot;
