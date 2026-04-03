import { definePrototype } from '@proto.ui/core';
import { asDropdownContent } from './as-dropdown-content';

const dropdownContent = definePrototype({
  name: 'base-dropdown-content',
  setup: () => {
    asDropdownContent();
  },
});

export default dropdownContent;
