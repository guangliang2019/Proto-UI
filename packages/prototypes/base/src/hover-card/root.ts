import { definePrototype, tw } from '@proto.ui/core';
import { asHoverCardRoot } from './as-hover-card-root';

const hoverCardRoot = definePrototype({
  name: 'base-hover-card-root',
  setup: (def) => {
    asHoverCardRoot();
    def.feedback.style.use(tw('relative inline-flex items-start'));
    return (r) => r.el('div', r.r.slot());
  },
});

export default hoverCardRoot;
