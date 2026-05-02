// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-capricorn' as const;
export const LUCIDE_ZODIAC_CAPRICORN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0' }),
  svg.path({ d: 'M7 19V6a3 3 0 0 0-3-3h0' }),
  svg.circle({ cx: 17, cy: 17, r: 3 }),
];

export function renderLucideZodiacCapricornIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_CAPRICORN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-capricorn-icon',
  prototypeName: 'lucide-zodiac-capricorn-icon',
  shapeFactory: LUCIDE_ZODIAC_CAPRICORN_SHAPE_FACTORY,
});

export const asLucideZodiacCapricornIcon = fixed.asHook;
export const lucideZodiacCapricornIcon = fixed.prototype;
export default lucideZodiacCapricornIcon;
