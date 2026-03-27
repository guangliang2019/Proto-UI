import { definePrototype, tw } from '@proto.ui/core';
import { asButton } from '@proto.ui/prototypes-base';
import type {
  ShadcnButtonExposes,
  ShadcnButtonProps,
  ShadcnButtonSize,
  ShadcnButtonVariant,
} from './types';

// Shared button skeleton copied from shadcn/ui and reduced to the plain
// utility tokens that Proto UI v0 can express in feedback.style today.
const BUTTON_BASE_TOKENS = [
  'group/button',
  'inline-flex',
  'shrink-0',
  'items-center',
  'justify-center',
  'rounded-lg',
  'border',
  'bg-clip-padding',
  'text-sm',
  'font-medium',
  'whitespace-nowrap',
  'transition-all',
  'outline-none',
  'select-none',
].join(' ');

// Variant rules stay composable and only encode the stable visual surface.
// Pseudo selectors such as hover/focus-visible/aria-invalid/dark are left to
// dedicated rule extensions because the current feedback token contract does
// not accept selector-style utilities directly.
const VARIANT_TOKENS: Record<ShadcnButtonVariant, string> = {
  default: 'border-transparent bg-primary text-primary-foreground',
  destructive: 'border-transparent bg-destructive/10 text-destructive',
  outline: 'border-border bg-background text-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  ghost: 'border-transparent bg-transparent text-foreground',
  link: 'border-transparent bg-transparent text-primary underline-offset-4',
};

// Size rules cover the public API we expose right now. The upstream examples
// also contain xs-style variants, but those are not part of this prototype API
// yet, so they are intentionally left out here.
const SIZE_TOKENS: Record<ShadcnButtonSize, string> = {
  default: 'h-8 gap-1.5 px-2.5',
  sm: 'h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem]',
  lg: 'h-9 gap-1.5 px-2.5',
  icon: 'size-8',
};

const button = definePrototype<ShadcnButtonProps, ShadcnButtonExposes>({
  name: 'shadcn-button',
  setup(def) {
    def.props.define({
      variant: {
        type: 'string',
        empty: 'fallback',
        enum: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      },
      size: { type: 'string', empty: 'fallback', enum: ['default', 'sm', 'lg', 'icon'] },
      disabled: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      variant: 'default',
      size: 'default',
      disabled: false,
    });

    asButton();
    const disabled = def.state.fromInteraction('disabled');
    const hovered = def.state.fromInteraction('hovered');
    const focused = def.state.fromInteraction('focused');
    const focusVisible = def.state.fromInteraction('focusVisible');
    const pressed = def.state.fromInteraction('pressed');
    const expanded = def.state.fromAccessibility('expanded');
    const invalid = def.state.fromAccessibility('invalid');

    // Base skeleton shared by every shadcn-style button.
    def.feedback.style.use(tw(BUTTON_BASE_TOKENS));

    // Variant surface rules map the public `variant` prop to visual tokens.
    (Object.keys(VARIANT_TOKENS) as ShadcnButtonVariant[]).forEach((variant) => {
      def.rule({
        when: (w: any) => w.prop('variant').eq(variant),
        intent: (i: any) => i.feedback.style.use(tw(VARIANT_TOKENS[variant])),
      });
    });

    // Size rules are isolated so later icon-density refinements can layer on
    // top without re-encoding every variant.
    (Object.keys(SIZE_TOKENS) as ShadcnButtonSize[]).forEach((size) => {
      def.rule({
        when: (w: any) => w.prop('size').eq(size),
        intent: (i: any) => i.feedback.style.use(tw(SIZE_TOKENS[size])),
      });
    });

    // Focus/press are shared interaction states exposed by `asButton()`, so
    // shadcn styling can stay inside rule semantics instead of hard-coding
    // host-specific pseudo selectors.
    def.rule({
      when: (w: any) => w.state(focusVisible).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('border-ring ring-3 ring-ring/50')),
    });

    def.rule({
      when: (w: any) => w.all(w.state(focusVisible).eq(true), w.prop('variant').eq('destructive')),
      intent: (i: any) => i.feedback.style.use(tw('border-destructive/40 ring-destructive/20')),
    });

    def.rule({
      when: (w: any) => w.state(pressed).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('translate-y-px')),
    });

    // Hovered surface rules are split by variant so later dark/meta branches
    // can replace them cleanly without duplicating the base variant tokens.
    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.prop('variant').eq('default')),
      intent: (i: any) => i.feedback.style.use(tw('bg-primary/80')),
    });
    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.prop('variant').eq('secondary')),
      intent: (i: any) => i.feedback.style.use(tw('bg-secondary/80')),
    });
    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.prop('variant').eq('outline')),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted text-foreground')),
    });
    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.prop('variant').eq('ghost')),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted text-foreground')),
    });
    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.prop('variant').eq('link')),
      intent: (i: any) => i.feedback.style.use(tw('underline')),
    });
    def.rule({
      when: (w: any) => w.all(w.state(hovered).eq(true), w.prop('variant').eq('destructive')),
      intent: (i: any) => i.feedback.style.use(tw('bg-destructive/20')),
    });

    // Accessibility semantics stay in the official shared state lane. This
    // keeps button-compatible semantics like `expanded` / `invalid` reusable
    // by higher-level triggers instead of reintroducing ad-hoc aria props here.
    def.rule({
      when: (w: any) => w.all(w.state(expanded).eq(true), w.prop('variant').eq('outline')),
      intent: (i: any) => i.feedback.style.use(tw('bg-muted text-foreground')),
    });
    def.rule({
      when: (w: any) => w.all(w.state(expanded).eq(true), w.prop('variant').eq('secondary')),
      intent: (i: any) => i.feedback.style.use(tw('bg-secondary text-secondary-foreground')),
    });

    def.rule({
      when: (w: any) => w.state(invalid).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('border-destructive ring-3 ring-destructive/20')),
    });

    // Dark mode stays in meta so the prototype remains host-agnostic while web
    // adapters still have a clean place to optimize to `dark:*`.
    def.rule({
      when: (w: any) => w.all(w.meta('colorScheme').eq('dark'), w.prop('variant').eq('outline')),
      intent: (i: any) => i.feedback.style.use(tw('border-input bg-input/30')),
    });
    def.rule({
      when: (w: any) =>
        w.all(
          w.meta('colorScheme').eq('dark'),
          w.state(hovered).eq(true),
          w.prop('variant').eq('outline')
        ),
      intent: (i: any) => i.feedback.style.use(tw('bg-input/50')),
    });
    def.rule({
      when: (w: any) =>
        w.all(w.meta('colorScheme').eq('dark'), w.prop('variant').eq('destructive')),
      intent: (i: any) => i.feedback.style.use(tw('bg-destructive/20')),
    });
    def.rule({
      when: (w: any) =>
        w.all(
          w.meta('colorScheme').eq('dark'),
          w.state(hovered).eq(true),
          w.prop('variant').eq('destructive')
        ),
      intent: (i: any) => i.feedback.style.use(tw('bg-destructive/30')),
    });
    def.rule({
      when: (w: any) =>
        w.all(
          w.meta('colorScheme').eq('dark'),
          w.state(focusVisible).eq(true),
          w.prop('variant').eq('destructive')
        ),
      intent: (i: any) => i.feedback.style.use(tw('ring-destructive/40')),
    });
    def.rule({
      when: (w: any) => w.all(w.meta('colorScheme').eq('dark'), w.state(invalid).eq(true)),
      intent: (i: any) => i.feedback.style.use(tw('border-destructive/50 ring-destructive/40')),
    });

    // Disabled remains a standalone rule because it semantically cuts across
    // every variant and size, and we now source it from the shared button
    // behavior instead of duplicating prop semantics locally.
    def.rule({
      when: (w: any) => w.state(disabled).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });
  },
});

export type { ShadcnButtonProps, ShadcnButtonExposes, ShadcnButtonSize, ShadcnButtonVariant };
export default button;
