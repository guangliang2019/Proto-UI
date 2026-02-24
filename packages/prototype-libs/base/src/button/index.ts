import { definePrototype } from '@proto-ui/core';
import { asButton } from './as-button';

export type { ButtonProps, ButtonExposes } from './types';
export { asButton } from './as-button';

const button = definePrototype({
  name: 'base-button',
  setup: () => {
    asButton();
  },
});

export default button;
