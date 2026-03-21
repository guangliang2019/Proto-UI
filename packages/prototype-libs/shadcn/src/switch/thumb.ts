import { definePrototype, tw } from '@proto-ui/core';
import { asSwitchThumb } from '@prototype-libs/base';
import type { ShadcnSwitchThumbExposes, ShadcnSwitchThumbProps } from './types';

const THUMB_TOKENS = [
  'pointer-events-none',
  'block',
  'size-5',
  'rounded-full',
  'bg-background',
  'border',
  'border-border/50',
  'shadow-lg',
  'ring-0',
  'transition-all',
  'duration-200',
  'ease-in-out',
  'will-change-transform',
  'translate-x-0',
].join(' ');

const switchThumb = definePrototype<ShadcnSwitchThumbProps, ShadcnSwitchThumbExposes>({
  name: 'shadcn-switch-thumb',
  setup(def) {
    asSwitchThumb();
    def.feedback.style.use(tw(THUMB_TOKENS));
  },
});

export default switchThumb;
