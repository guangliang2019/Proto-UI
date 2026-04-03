import { definePrototype } from '@proto.ui/core';
import { asTabsContent } from './as-tabs-content';

const tabsContent = definePrototype({
  name: 'base-tabs-content',
  setup: () => {
    asTabsContent();
  },
});

export default tabsContent;
