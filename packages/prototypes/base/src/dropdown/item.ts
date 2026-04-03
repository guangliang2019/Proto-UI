import { definePrototype } from '@proto.ui/core';
import { asDropdownItem } from './as-dropdown-item';

const dropdownItem = definePrototype({
  name: 'base-dropdown-item',
  setup: () => {
    asDropdownItem();
  },
});

export default dropdownItem;
