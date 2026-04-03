import { definePrototype, tw } from '@proto.ui/core';
import { asHoverCardRoot } from '@proto.ui/prototypes-base';
import type { ShadcnHoverCardRootExposes, ShadcnHoverCardRootProps } from './types';

const hoverCardRoot = definePrototype<ShadcnHoverCardRootProps, ShadcnHoverCardRootExposes>({
  name: 'shadcn-hover-card-root',
  setup(def) {
    asHoverCardRoot();
    def.feedback.style.use(tw('relative inline-flex items-start'));
  },
});

export default hoverCardRoot;
