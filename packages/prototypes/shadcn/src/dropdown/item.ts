import { definePrototype, tw } from '@proto.ui/core';
import { asDropdownItem } from '@proto.ui/prototypes-base';
import type { ShadcnDropdownItemExposes, ShadcnDropdownItemProps } from './types';

const ITEM_BASE_TOKENS = [
  'relative',
  'flex',
  'w-full',
  'cursor-default',
  'select-none',
  'items-center',
  'gap-2',
  'rounded-lg',
  'border',
  'border-transparent',
  'px-2.5',
  'py-2',
  'text-left',
  'text-sm',
  'outline-none',
  'transition-colors',
].join(' ');

const dropdownItem = definePrototype<ShadcnDropdownItemProps, ShadcnDropdownItemExposes>({
  name: 'shadcn-dropdown-item',
  setup(def) {
    asDropdownItem();
    const disabled = def.state.fromInteraction('disabled');
    const hovered = def.state.fromInteraction('hovered');
    const focused = def.state.fromInteraction('focused');
    const focusVisible = def.state.fromInteraction('focusVisible');
    const pressed = def.state.fromInteraction('pressed');

    def.feedback.style.use(tw(ITEM_BASE_TOKENS));

    def.rule({
      when: (w: any) =>
        w.any(w.state(hovered).eq(true), w.state(focused).eq(true), w.state(focusVisible).eq(true)),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted text-foreground')),
    });

    def.rule({
      when: (w: any) => w.state(focusVisible).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('ring-2 ring-ring/40 ring-inset')),
    });

    def.rule({
      when: (w: any) => w.state(pressed).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted/80 text-foreground')),
    });

    def.rule({
      when: (w: any) => w.state(disabled).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });
  },
});

export default dropdownItem;
