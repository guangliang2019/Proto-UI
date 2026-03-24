import { definePrototype } from '@proto-ui/core';
import { asDropdownTrigger } from './as-dropdown-trigger';

const dropdownTrigger = definePrototype({
  name: 'base-dropdown-trigger',
  setup: () => {
    asDropdownTrigger();
    return (r) => r.el('button', r.r.slot());
  },
});

export default dropdownTrigger;
