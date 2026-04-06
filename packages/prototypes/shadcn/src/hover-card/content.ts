import { definePrototype, tw } from '@proto.ui/core';
import { asHoverCardContent } from '@proto.ui/prototypes-base';
import type { ShadcnHoverCardContentExposes, ShadcnHoverCardContentProps } from './types';

const hoverCardContent = definePrototype<
  ShadcnHoverCardContentProps,
  ShadcnHoverCardContentExposes
>({
  name: 'shadcn-hover-card-content',
  setup(def) {
    asHoverCardContent();

    def.feedback.style.use(
      tw(
        'absolute left-0 top-full z-40 mt-2 block w-80 rounded-xl border border-border/60 bg-background p-4 text-sm leading-6 shadow-lg'
      )
    );
  },
});

export default hoverCardContent;
