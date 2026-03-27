import { definePrototype, tw } from '@proto.ui/core';
import { asTabsContent } from '@proto.ui/prototypes-base';
import type { ShadcnTabsContentExposes, ShadcnTabsContentProps } from './types';

const tabsContent = definePrototype<ShadcnTabsContentProps, ShadcnTabsContentExposes>({
  name: 'shadcn-tabs-content',
  setup(def) {
    asTabsContent();
    const current = def.state.fromAccessibility('current');
    def.feedback.style.use(
      tw(
        'block w-full min-h-28 rounded-xl border border-border/60 bg-background p-4 text-sm leading-6 shadow-xs outline-none'
      )
    );
    def.rule({
      when: (w: any) => w.state(current).eq(false),
      intent: (i: any) => i.feedback.style.use(tw('hidden')),
    });
    return (r) => r.el('div', r.r.slot());
  },
});

export default tabsContent;
