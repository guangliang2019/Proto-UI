import { definePrototype } from '@proto.ui/core';
import { asTabsList } from './as-tabs-list';

const tabsList = definePrototype({
  name: 'base-tabs-list',
  setup: () => {
    asTabsList();
    return (r) => r.el('div', r.r.slot());
  },
});

export default tabsList;
