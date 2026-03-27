import { definePrototype, tw } from '@proto.ui/core';
import { asToggle } from '@proto.ui/prototypes-base';
import type { ShadcnToggleExposes, ShadcnToggleProps } from './types';

const TOGGLE_BASE_TOKENS = [
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'rounded-md',
  'text-sm',
  'font-medium',
  'transition-colors',
  'outline-none',
  'border',
  'border-transparent',
  'whitespace-nowrap',
].join(' ');

const VARIANT_TOKENS: Record<NonNullable<ShadcnToggleProps['variant']>, string> = {
  default: 'bg-transparent text-foreground',
  outline: 'border-border bg-transparent shadow-xs',
};

const SIZE_TOKENS: Record<NonNullable<ShadcnToggleProps['size']>, string> = {
  default: 'h-9 px-3 min-w-9',
  sm: 'h-8 px-2.5 min-w-8',
  lg: 'h-10 px-5 min-w-10',
};

const toggle = definePrototype<ShadcnToggleProps, ShadcnToggleExposes>({
  name: 'shadcn-toggle',
  setup(def) {
    def.props.define({
      variant: { type: 'string', empty: 'fallback', enum: ['default', 'outline'] },
      size: { type: 'string', empty: 'fallback', enum: ['default', 'sm', 'lg'] },
      checked: { type: 'boolean', empty: 'fallback' },
      defaultChecked: { type: 'boolean', empty: 'fallback' },
      disabled: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      variant: 'default',
      size: 'default',
      defaultChecked: false,
      disabled: false,
    });

    asToggle();

    const checked = def.state.fromAccessibility('checked');
    const disabled = def.state.fromInteraction('disabled');
    const hovered = def.state.fromInteraction('hovered');
    const focusVisible = def.state.fromInteraction('focusVisible');

    def.feedback.style.use(tw(TOGGLE_BASE_TOKENS));

    (Object.keys(VARIANT_TOKENS) as Array<NonNullable<ShadcnToggleProps['variant']>>).forEach(
      (variant) => {
        def.rule({
          when: (w: any) => w.prop('variant').eq(variant),
          intent: (i: any) => i.feedback.style.use(tw(VARIANT_TOKENS[variant])),
        });
      }
    );

    (Object.keys(SIZE_TOKENS) as Array<NonNullable<ShadcnToggleProps['size']>>).forEach((size) => {
      def.rule({
        when: (w: any) => w.prop('size').eq(size),
        intent: (i: any) => i.feedback.style.use(tw(SIZE_TOKENS[size])),
      });
    });

    def.rule({
      when: (w: any) => w.state(checked).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted text-muted-foreground')),
    });

    def.rule({
      when: (w: any) => w.all(w.state(checked).eq(true), w.prop('variant').eq('outline')),
      intent: (i: any) => i.feedback.style.use(tw('bg-accent text-accent-foreground')),
    });

    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.state(checked).eq(false)),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted/60 text-foreground')),
    });

    def.rule({
      when: (w: any) => w.state(focusVisible).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('ring-3 ring-ring/50')),
    });

    def.rule({
      when: (w: any) => w.state(disabled).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });
  },
});

export type {
  ShadcnToggleProps,
  ShadcnToggleExposes,
  ShadcnToggleStateHandles,
  ShadcnToggleAsHookContract,
} from './types';
export default toggle;
