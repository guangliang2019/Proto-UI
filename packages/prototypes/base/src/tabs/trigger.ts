import { definePrototype } from '@proto.ui/core';
import { asTabsTrigger } from './as-tabs-trigger';

const tabsTrigger = definePrototype({
  name: 'base-tabs-trigger',
  setup: () => {
    asTabsTrigger();
  },
});

export default tabsTrigger;
