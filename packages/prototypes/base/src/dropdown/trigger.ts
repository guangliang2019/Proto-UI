import { definePrototype } from '@proto.ui/core';
import { asDropdownTrigger } from './as-dropdown-trigger';

const dropdownTrigger = definePrototype({
  name: 'base-dropdown-trigger',
  setup: () => {
    asDropdownTrigger();
  },
});

export default dropdownTrigger;
