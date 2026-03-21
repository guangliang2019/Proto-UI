import { definePrototype } from '@proto-ui/core';
import { asToggle } from './as-toggle';

export type { ToggleProps, ToggleExposes, ToggleStateHandles, ToggleAsHookContract } from './types';
export { asToggle } from './as-toggle';

const toggle = definePrototype({
  name: 'base-toggle',
  setup: () => {
    asToggle();
    return (r) => r.el('button', r.r.slot());
  },
});

export default toggle;
