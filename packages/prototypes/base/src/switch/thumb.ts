import { definePrototype } from '@proto.ui/core';
import { asSwitchThumb } from './as-switch-thumb';

const switchThumb = definePrototype({
  name: 'base-switch-thumb',
  setup: () => {
    asSwitchThumb();
    return (r) => r.el('span', r.r.slot());
  },
});

export default switchThumb;
