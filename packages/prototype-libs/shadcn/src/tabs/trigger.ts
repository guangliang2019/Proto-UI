import { definePrototype, tw } from '@proto-ui/core';
import { asTabsTrigger } from '@prototype-libs/base';
import type { ShadcnTabsTriggerExposes, ShadcnTabsTriggerProps } from './types';

const BASE_TOKENS = [
  'inline-flex',
  'items-center',
  'justify-center',
  'whitespace-nowrap',
  'rounded-lg',
  'border',
  'border-transparent',
  'px-3',
  'py-1.5',
  'text-sm',
  'font-medium',
  'transition-all',
  'outline-none',
  'text-muted-foreground',
  'select-none',
].join(' ');

const tabsTrigger = definePrototype<ShadcnTabsTriggerProps, ShadcnTabsTriggerExposes>({
  name: 'shadcn-tabs-trigger',
  setup(def) {
    asTabsTrigger();
    const disabled = def.state.fromInteraction('disabled');
    const hovered = def.state.fromInteraction('hovered');
    const focusVisible = def.state.fromInteraction('focusVisible');
    const pressed = def.state.fromInteraction('pressed');
    const selected = def.state.fromAccessibility('selected');

    def.feedback.style.use(tw(BASE_TOKENS));

    def.rule({
      when: (w: any) => w.state(focusVisible).eq(true),
      intent: (i: any) =>
        i.feedback.style.use(
          tw(
            'bg-background text-foreground shadow-xs ring-3 ring-ring/50 ring-offset-2 ring-offset-background'
          )
        ),
    });

    def.rule({
      when: (w: any) => w.state(selected).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('bg-background text-foreground shadow-xs')),
    });

    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.state(selected).eq(false)),
      intent: (i: any) => i.feedback.style.use(tw('bg-background/70 text-foreground shadow-xs')),
    });

    def.rule({
      when: (w: any) => w.state(pressed).eq(true),
      intent: (i: any) =>
        i.feedback.style.use(tw('scale-[0.99] bg-background text-foreground shadow-xs')),
    });

    def.rule({
      when: (w: any) => w.state(disabled).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });
  },
});

export default tabsTrigger;
