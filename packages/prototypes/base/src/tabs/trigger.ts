import { definePrototype } from '@proto.ui/core';
import { asTabsTrigger } from './as-tabs-trigger';

const tabsTrigger = definePrototype({
  name: 'base-tabs-trigger',
  setup: () => {
    asTabsTrigger();
    return (r) => r.el('button', r.r.slot());
  },
});

export default tabsTrigger;
