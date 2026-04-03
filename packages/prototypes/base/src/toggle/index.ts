import { definePrototype } from '@proto.ui/core';
import { asToggle } from './as-toggle';

export type { ToggleProps, ToggleExposes, ToggleStateHandles, ToggleAsHookContract } from './types';
export { asToggle } from './as-toggle';

const toggle = definePrototype({
  name: 'base-toggle',
  setup: () => {
    asToggle();
  },
});

export default toggle;
