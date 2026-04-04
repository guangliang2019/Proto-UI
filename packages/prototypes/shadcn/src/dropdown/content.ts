import { definePrototype, tw } from '@proto.ui/core';
import { asDropdownContent } from '@proto.ui/prototypes-base';
import type { ShadcnDropdownContentExposes, ShadcnDropdownContentProps } from './types';

const dropdownContent = definePrototype<ShadcnDropdownContentProps, ShadcnDropdownContentExposes>({
  name: 'shadcn-dropdown-content',
  setup(def) {
    asDropdownContent();

    def.feedback.style.use(
      tw(
        'absolute left-0 top-full z-50 mt-2 block min-w-56 overflow-hidden rounded-xl border border-border/60 bg-background p-1 text-sm shadow-lg'
      )
    );
  },
});

export default dropdownContent;
