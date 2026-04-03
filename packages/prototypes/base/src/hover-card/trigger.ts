import { definePrototype } from '@proto.ui/core';
import { asHoverCardTrigger } from './as-hover-card-trigger';

const hoverCardTrigger = definePrototype({
  name: 'base-hover-card-trigger',
  setup: () => {
    asHoverCardTrigger();
  },
});

export default hoverCardTrigger;
