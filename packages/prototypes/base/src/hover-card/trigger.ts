import { definePrototype } from '@proto.ui/core';
import { asHoverCardTrigger } from './as-hover-card-trigger';

const hoverCardTrigger = definePrototype({
  name: 'base-hover-card-trigger',
  setup: () => {
    asHoverCardTrigger();
    return (r) => r.el('button', r.r.slot());
  },
});

export default hoverCardTrigger;
