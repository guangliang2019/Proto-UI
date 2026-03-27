import { definePrototype, tw } from '@proto.ui/core';
import { asTabsRoot } from '@proto.ui/prototypes-base';
import type { ShadcnTabsRootExposes, ShadcnTabsRootProps } from './types';

const tabsRoot = definePrototype<ShadcnTabsRootProps, ShadcnTabsRootExposes>({
  name: 'shadcn-tabs-root',
  setup(def) {
    asTabsRoot();
    def.feedback.style.use(tw('flex flex-col gap-3 text-foreground'));
    return (r) => r.el('div', r.r.slot());
  },
});

export default tabsRoot;
