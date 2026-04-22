import { definePrototype, tw } from '@proto.ui/core';
import { asDropdownTrigger } from '@proto.ui/prototypes-base';
import { renderLucideIcon } from '@proto.ui/prototypes-lucide';
import type { ShadcnDropdownTriggerExposes, ShadcnDropdownTriggerProps } from './types';

const TRIGGER_BASE_TOKENS = [
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'rounded-md',
  'border',
  'border-border/60',
  'bg-background',
  'px-3',
  'py-2',
  'text-sm',
  'font-medium',
  'shadow-xs',
  'transition-colors',
  'outline-none',
  'select-none',
].join(' ');

const DEFAULT_INDICATOR_ICON = 'chevron-down';
const DEFAULT_INDICATOR_SIZE = 16;
const DEFAULT_INDICATOR_STROKE_WIDTH = 2;

function toPositiveNumber(value: unknown, fallback: number): number {
  if (typeof value !== 'number') return fallback;
  if (!Number.isFinite(value)) return fallback;
  if (value <= 0) return fallback;
  return value;
}

const dropdownTrigger = definePrototype<ShadcnDropdownTriggerProps, ShadcnDropdownTriggerExposes>({
  name: 'shadcn-dropdown-trigger',
  setup(def) {
    def.props.define({
      disabled: { type: 'boolean', empty: 'fallback' },
      indicator: { type: 'boolean', empty: 'fallback' },
      indicatorIcon: {
        type: 'string',
        empty: 'fallback',
        enum: ['chevron-down', 'chevrons-up-down'],
      },
      indicatorSize: { type: 'number', empty: 'fallback' },
      indicatorStrokeWidth: { type: 'number', empty: 'fallback' },
    });
    def.props.setDefaults({
      disabled: false,
      indicator: true,
      indicatorIcon: DEFAULT_INDICATOR_ICON,
      indicatorSize: DEFAULT_INDICATOR_SIZE,
      indicatorStrokeWidth: DEFAULT_INDICATOR_STROKE_WIDTH,
    });

    asDropdownTrigger();
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
      intent: (i: any) => i.feedback.style.use(tw('translate-y-px bg-muted text-foreground')),
    });

    def.rule({
      when: (w: any) => w.state(disabled).eq(true),
      intent: (i: any) => i.feedback.style.use(tw('pointer-events-none opacity-50')),
    });

    return (renderer) => {
      const props = renderer.read.props.get();
      const indicatorEnabled = props.indicator !== false;
      const indicatorIcon =
        props.indicatorIcon === 'chevrons-up-down' ? props.indicatorIcon : DEFAULT_INDICATOR_ICON;
      const indicatorSize = toPositiveNumber(props.indicatorSize, DEFAULT_INDICATOR_SIZE);
      const indicatorStrokeWidth = toPositiveNumber(
        props.indicatorStrokeWidth,
        DEFAULT_INDICATOR_STROKE_WIDTH
      );

      return [
        renderer.r.slot(),
        indicatorEnabled
          ? renderLucideIcon(renderer, {
              name: indicatorIcon,
              size: indicatorSize,
              strokeWidth: indicatorStrokeWidth,
            })
          : null,
      ];
    };
  },
});

export default dropdownTrigger;
