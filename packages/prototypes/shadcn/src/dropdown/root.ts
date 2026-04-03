import { definePrototype, tw } from '@proto.ui/core';
import { asDropdownRoot } from '@proto.ui/prototypes-base';
import type { ShadcnDropdownRootExposes, ShadcnDropdownRootProps } from './types';

const dropdownRoot = definePrototype<ShadcnDropdownRootProps, ShadcnDropdownRootExposes>({
  name: 'shadcn-dropdown-root',
  setup(def) {
    asDropdownRoot();
    def.feedback.style.use(tw('relative inline-flex items-start'));
  },
});

export default dropdownRoot;
