// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-virgo' as const;
export const LUCIDE_ZODIAC_VIRGO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5' }),
  svg.path({ d: 'M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5' }),
  svg.path({ d: 'M6 19V6a3 3 0 0 0-3-3h0' }),
  svg.path({ d: 'M6 5.5a1 1 0 0 1 5 0V19' }),
];

export function renderLucideZodiacVirgoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_VIRGO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-virgo-icon',
  prototypeName: 'lucide-zodiac-virgo-icon',
  shapeFactory: LUCIDE_ZODIAC_VIRGO_SHAPE_FACTORY,
});

export const asLucideZodiacVirgoIcon = fixed.asHook;
export const lucideZodiacVirgoIcon = fixed.prototype;
export default lucideZodiacVirgoIcon;
