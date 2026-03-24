import { definePrototype, tw } from '@proto-ui/core';
import { asHoverCardRoot } from '@prototype-libs/base';
import type { ShadcnHoverCardRootExposes, ShadcnHoverCardRootProps } from './types';

const hoverCardRoot = definePrototype<ShadcnHoverCardRootProps, ShadcnHoverCardRootExposes>({
  name: 'shadcn-hover-card-root',
  setup(def) {
    asHoverCardRoot();
    def.feedback.style.use(tw('relative inline-flex items-start'));
    return (r) => r.el('div', r.r.slot());
  },
});

export default hoverCardRoot;
