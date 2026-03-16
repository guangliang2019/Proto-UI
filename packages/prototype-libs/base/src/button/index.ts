import { definePrototype } from '@proto-ui/core';
import { asButton } from './as-button';

export type { ButtonProps, ButtonExposes, ButtonStateHandles, ButtonAsHookContract } from './types';
export { asButton } from './as-button';

const button = definePrototype({
  name: 'base-button',
  setup: () => {
    asButton();
    return (r) => r.el('button', r.r.slot());
  },
});

export default button;
