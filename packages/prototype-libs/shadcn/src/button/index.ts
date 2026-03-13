import { definePrototype, tw } from '@proto-ui/core';
import { asButton } from '@prototype-libs/base';
import type {
  ShadcnButtonExposes,
  ShadcnButtonProps,
  ShadcnButtonSize,
  ShadcnButtonVariant,
} from './types';

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

    def.feedback.style.use(
      tw(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors'
      )
    );

    const variantTokens: Record<ShadcnButtonVariant, string> = {
      default: 'bg-black text-white',
      destructive: 'bg-red-600 text-white',
      outline: 'border border-zinc-200 bg-white text-zinc-900',
      secondary: 'bg-zinc-100 text-zinc-900',
      ghost: 'bg-transparent text-zinc-900',
      link: 'bg-transparent text-zinc-900 underline',
    };

    const sizeTokens: Record<ShadcnButtonSize, string> = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9',
    };

    (Object.keys(variantTokens) as ShadcnButtonVariant[]).forEach((variant) => {
      def.rule({
        when: (w: any) => w.prop('variant').eq(variant),
        intent: (i: any) => i.feedback.style.use(tw(variantTokens[variant])),
      });
    });

    (Object.keys(sizeTokens) as ShadcnButtonSize[]).forEach((size) => {
      def.rule({
        when: (w: any) => w.prop('size').eq(size),
        intent: (i: any) => i.feedback.style.use(tw(sizeTokens[size])),
      });
    });

    def.rule({
      when: (w: any) => w.prop('disabled').eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });
  },
});

export type { ShadcnButtonProps, ShadcnButtonExposes, ShadcnButtonSize, ShadcnButtonVariant };
export default button;
