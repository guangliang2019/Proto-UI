// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-pisces' as const;
export const LUCIDE_ZODIAC_PISCES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 21a15 15 0 0 1 0-18' }),
  svg.path({ d: 'M20 12H4' }),
  svg.path({ d: 'M5 3a15 15 0 0 1 0 18' }),
];

export function renderLucideZodiacPiscesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_PISCES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-pisces-icon',
  prototypeName: 'lucide-zodiac-pisces-icon',
  shapeFactory: LUCIDE_ZODIAC_PISCES_SHAPE_FACTORY,
});

export const asLucideZodiacPiscesIcon = fixed.asHook;
export const lucideZodiacPiscesIcon = fixed.prototype;
export default lucideZodiacPiscesIcon;
