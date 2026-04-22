// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import type { SvgFactories, TemplateChildren } from '@proto.ui/core';

export const LUCIDE_ICON_NAMES = [
  'check',
  'chevron-down',
  'chevrons-up-down',
  'circle',
  'minus',
  'x',
] as const;

export type LucideIconName = (typeof LUCIDE_ICON_NAMES)[number];

export function isLucideIconName(value: string): value is LucideIconName {
  return (LUCIDE_ICON_NAMES as readonly string[]).includes(value);
}

type IconShapeFactory = (svg: SvgFactories) => TemplateChildren;

export const LUCIDE_ICON_REGISTRY: Record<LucideIconName, IconShapeFactory> = {
  'check': (svg) => svg.path({ d: 'M20 6 9 17l-5-5' }),
  'chevron-down': (svg) => svg.path({ d: 'm6 9 6 6 6-6' }),
  'chevrons-up-down': (svg) => [svg.path({ d: 'm7 15 5 5 5-5' }), svg.path({ d: 'm7 9 5-5 5 5' })],
  'circle': (svg) => svg.circle({ cx: 12, cy: 12, r: 10 }),
  'minus': (svg) => svg.path({ d: 'M5 12h14' }),
  'x': (svg) => [svg.path({ d: 'M18 6 6 18' }), svg.path({ d: 'm6 6 12 12' })],
};
