import { definePrototype, tw } from '@proto.ui/core';
import { asHoverCardTrigger } from '@proto.ui/prototypes-base';
import type { ShadcnHoverCardTriggerExposes, ShadcnHoverCardTriggerProps } from './types';

const TRIGGER_BASE_TOKENS = [
  'inline-flex',
  'items-center',
  'rounded-md',
  'border',
  'border-border/60',
  'bg-background',
  'px-3',
  'py-1.5',
  'text-sm',
  'font-medium',
  'shadow-xs',
  'transition-colors',
  'outline-none',
  'select-none',
].join(' ');

const hoverCardTrigger = definePrototype<
  ShadcnHoverCardTriggerProps,
  ShadcnHoverCardTriggerExposes
>({
  name: 'shadcn-hover-card-trigger',
  setup(def) {
    asHoverCardTrigger();
    const disabled = def.state.fromInteraction('disabled');
    const hovered = def.state.fromInteraction('hovered');
    const focusVisible = def.state.fromInteraction('focusVisible');
    const pressed = def.state.fromInteraction('pressed');

    def.feedback.style.use(tw(TRIGGER_BASE_TOKENS));

    def.rule({
      when: (w: any) => w.state(hovered).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted text-foreground')),
    });

    def.rule({
      when: (w: any) => w.state(focusVisible).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('ring-3 ring-ring/50 ring-offset-2')),
    });

    def.rule({
      when: (w: any) => w.state(pressed).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('translate-y-px')),
    });

    def.rule({
      when: (w: any) => w.state(disabled).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });
  },
});

export default hoverCardTrigger;
