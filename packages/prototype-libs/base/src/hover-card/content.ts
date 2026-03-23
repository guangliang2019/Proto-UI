import { definePrototype, tw } from '@proto-ui/core';
import { asHoverCardContent } from './as-hover-card-content';

const hoverCardContent = definePrototype({
  name: 'base-hover-card-content',
  setup: (def) => {
    asHoverCardContent();
    def.feedback.style.use(tw('absolute left-0 top-full z-50 mt-2'));
    return (r) => r.el('div', r.r.slot());
  },
});

export default hoverCardContent;
