// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-ophiuchus' as const;
export const LUCIDE_ZODIAC_OPHIUCHUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10' }),
  svg.path({ d: 'M6 3v12a6 6 0 0 0 12 0V3' }),
];

export function renderLucideZodiacOphiuchusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_OPHIUCHUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-ophiuchus-icon',
  prototypeName: 'lucide-zodiac-ophiuchus-icon',
  shapeFactory: LUCIDE_ZODIAC_OPHIUCHUS_SHAPE_FACTORY,
});

export const asLucideZodiacOphiuchusIcon = fixed.asHook;
export const lucideZodiacOphiuchusIcon = fixed.prototype;
export default lucideZodiacOphiuchusIcon;
