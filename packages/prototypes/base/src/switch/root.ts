import { definePrototype } from '@proto.ui/core';
import { asSwitchRoot } from './as-switch-root';

const switchRoot = definePrototype({
  name: 'base-switch-root',
  setup: () => {
    asSwitchRoot();
    return (r) => r.el('button', r.r.slot());
  },
});

export default switchRoot;
