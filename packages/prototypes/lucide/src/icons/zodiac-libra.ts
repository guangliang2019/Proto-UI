// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-libra' as const;
export const LUCIDE_ZODIAC_LIBRA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21',
  }),
  svg.path({ d: 'M3 20h18' }),
];

export function renderLucideZodiacLibraIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_LIBRA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-libra-icon',
  prototypeName: 'lucide-zodiac-libra-icon',
  shapeFactory: LUCIDE_ZODIAC_LIBRA_SHAPE_FACTORY,
});

export const asLucideZodiacLibraIcon = fixed.asHook;
export const lucideZodiacLibraIcon = fixed.prototype;
export default lucideZodiacLibraIcon;
