// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-taurus' as const;
export const LUCIDE_ZODIAC_TAURUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 15, r: 6 }),
  svg.path({ d: 'M18 3A6 6 0 0 1 6 3' }),
];

export function renderLucideZodiacTaurusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_TAURUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-taurus-icon',
  prototypeName: 'lucide-zodiac-taurus-icon',
  shapeFactory: LUCIDE_ZODIAC_TAURUS_SHAPE_FACTORY,
});

export const asLucideZodiacTaurusIcon = fixed.asHook;
export const lucideZodiacTaurusIcon = fixed.prototype;
export default lucideZodiacTaurusIcon;
