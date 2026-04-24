// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-leo' as const;
export const LUCIDE_ZODIAC_LEO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0' }),
  svg.circle({ cx: 7, cy: 16, r: 3 }),
];

export function renderLucideZodiacLeoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_LEO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-leo-icon',
  prototypeName: 'lucide-zodiac-leo-icon',
  shapeFactory: LUCIDE_ZODIAC_LEO_SHAPE_FACTORY,
});

export const asLucideZodiacLeoIcon = fixed.asHook;
export const lucideZodiacLeoIcon = fixed.prototype;
export default lucideZodiacLeoIcon;
