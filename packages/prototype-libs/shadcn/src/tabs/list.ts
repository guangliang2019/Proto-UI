import { definePrototype, tw } from '@proto-ui/core';
import { asTabsList } from '@prototype-libs/base';
import type { ShadcnTabsListExposes, ShadcnTabsListProps } from './types';

const tabsList = definePrototype<ShadcnTabsListProps, ShadcnTabsListExposes>({
  name: 'shadcn-tabs-list',
  setup(def) {
    asTabsList();
    def.feedback.style.use(
      tw(
        'inline-flex h-10 items-center rounded-xl border border-border/60 bg-muted/80 p-1 text-muted-foreground shadow-xs backdrop-blur-xs'
      )
    );
    return (r) => r.el('div', r.r.slot());
  },
});

export default tabsList;
