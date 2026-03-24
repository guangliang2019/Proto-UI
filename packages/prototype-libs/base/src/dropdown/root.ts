import { definePrototype } from '@proto-ui/core';
import { asDropdownRoot } from './as-dropdown-root';

const dropdownRoot = definePrototype({
  name: 'base-dropdown-root',
  setup: () => {
    asDropdownRoot();
    return (r) => r.el('div', r.r.slot());
  },
});

export default dropdownRoot;
