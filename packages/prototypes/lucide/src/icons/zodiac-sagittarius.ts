// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-sagittarius' as const;
export const LUCIDE_ZODIAC_SAGITTARIUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 3h6v6' }),
  svg.path({ d: 'M21 3 3 21' }),
  svg.path({ d: 'm9 9 6 6' }),
];

export function renderLucideZodiacSagittariusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_SAGITTARIUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-sagittarius-icon',
  prototypeName: 'lucide-zodiac-sagittarius-icon',
  shapeFactory: LUCIDE_ZODIAC_SAGITTARIUS_SHAPE_FACTORY,
});

export const asLucideZodiacSagittariusIcon = fixed.asHook;
export const lucideZodiacSagittariusIcon = fixed.prototype;
export default lucideZodiacSagittariusIcon;
