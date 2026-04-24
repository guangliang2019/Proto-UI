// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-scorpio' as const;
export const LUCIDE_ZODIAC_SCORPIO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3' }),
  svg.path({ d: 'm22 19-3 3' }),
  svg.path({ d: 'M5 19V5.5a1 1 0 0 1 5 0' }),
  svg.path({ d: 'M5 5.5A2.5 2.5 0 0 0 2.5 3' }),
];

export function renderLucideZodiacScorpioIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_SCORPIO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-scorpio-icon',
  prototypeName: 'lucide-zodiac-scorpio-icon',
  shapeFactory: LUCIDE_ZODIAC_SCORPIO_SHAPE_FACTORY,
});

export const asLucideZodiacScorpioIcon = fixed.asHook;
export const lucideZodiacScorpioIcon = fixed.prototype;
export default lucideZodiacScorpioIcon;
