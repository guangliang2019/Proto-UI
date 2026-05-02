// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-aquarius' as const;
export const LUCIDE_ZODIAC_AQUARIUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10',
  }),
  svg.path({
    d: 'm2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002',
  }),
];

export function renderLucideZodiacAquariusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_AQUARIUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-aquarius-icon',
  prototypeName: 'lucide-zodiac-aquarius-icon',
  shapeFactory: LUCIDE_ZODIAC_AQUARIUS_SHAPE_FACTORY,
});

export const asLucideZodiacAquariusIcon = fixed.asHook;
export const lucideZodiacAquariusIcon = fixed.prototype;
export default lucideZodiacAquariusIcon;
