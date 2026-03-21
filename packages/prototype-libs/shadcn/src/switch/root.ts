import { definePrototype, tw } from '@proto-ui/core';
import { asSwitchRoot } from '@prototype-libs/base';
import type { ShadcnSwitchRootExposes, ShadcnSwitchRootProps } from './types';

const ROOT_BASE_TOKENS = [
  'peer',
  'inline-flex',
  'h-6',
  'w-11',
  'shrink-0',
  'items-center',
  'rounded-full',
  'border',
  'border-transparent',
  'pl-0.5',
  'pr-[22px]',
  'shadow-xs',
  'transition-all',
  'duration-200',
  'ease-in-out',
  'outline-none',
  'bg-input/80',
  'select-none',
].join(' ');

const switchRoot = definePrototype<ShadcnSwitchRootProps, ShadcnSwitchRootExposes>({
  name: 'shadcn-switch-root',
  setup(def) {
    asSwitchRoot();

    const checked = def.state.fromAccessibility('checked');
    const disabled = def.state.fromInteraction('disabled');
    const hovered = def.state.fromInteraction('hovered');
    const focusVisible = def.state.fromInteraction('focusVisible');
    const pressed = def.state.fromInteraction('pressed');

    def.feedback.style.use(tw(ROOT_BASE_TOKENS));

    def.rule({
      when: (w: any) => w.state(checked).eq(true),
      intent: (i: any) =>
        i.feedback.style.use(tw('pl-[22px] pr-0.5 bg-primary text-primary-foreground')),
    });

    def.rule({
      when: (w: any) => w.all(w.state(checked).eq(false), w.state(hovered).eq(true)),
      intent: (i: any) => i.feedback.style.use(tw('bg-input')),
    });

    def.rule({
      when: (w: any) => w.all(w.state(checked).eq(true), w.state(hovered).eq(true)),
      intent: (i: any) => i.feedback.style.use(tw('bg-primary/90')),
    });

    def.rule({
      when: (w: any) => w.state(pressed).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('scale-[0.98]')),
    });

    def.rule({
      when: (w: any) => w.state(focusVisible).eq(true),
      intent: (i: any) =>
        i.feedback.style.use(tw('ring-3 ring-ring/50 ring-offset-2 ring-offset-background')),
    });

    def.rule({
      when: (w: any) => w.state(disabled).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });

    def.rule({
      when: (w: any) => w.all(w.meta('colorScheme').eq('dark'), w.state(checked).eq(false)),
      intent: (i: any) => i.feedback.style.use(tw('bg-input/50')),
    });

    def.rule({
      when: (w: any) => w.all(w.meta('colorScheme').eq('dark'), w.state(checked).eq(true)),
      intent: (i: any) => i.feedback.style.use(tw('bg-primary')),
    });
  },
});

export default switchRoot;
