import { definePrototype } from '@proto.ui/core';
import { asSwitchThumb } from './as-switch-thumb';

const switchThumb = definePrototype({
  name: 'base-switch-thumb',
  setup: () => {
    asSwitchThumb();
  },
});

export default switchThumb;
