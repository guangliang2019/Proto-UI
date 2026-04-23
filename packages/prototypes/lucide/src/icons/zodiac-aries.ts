// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-aries' as const;
export const LUCIDE_ZODIAC_ARIES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7.5a4.5 4.5 0 1 1 5 4.5' }),
  svg.path({ d: 'M7 12a4.5 4.5 0 1 1 5-4.5V21' }),
];

export function renderLucideZodiacAriesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_ARIES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-aries-icon',
  prototypeName: 'lucide-zodiac-aries-icon',
  shapeFactory: LUCIDE_ZODIAC_ARIES_SHAPE_FACTORY,
});

export const asLucideZodiacAriesIcon = fixed.asHook;
export const lucideZodiacAriesIcon = fixed.prototype;
export default lucideZodiacAriesIcon;
