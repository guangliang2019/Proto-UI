import { definePrototype } from '@proto.ui/core';
import { asSwitchRoot } from './as-switch-root';

const switchRoot = definePrototype({
  name: 'base-switch-root',
  setup: () => {
    asSwitchRoot();
  },
});

export default switchRoot;
