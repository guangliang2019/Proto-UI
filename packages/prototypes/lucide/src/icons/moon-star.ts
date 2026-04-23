// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'moon-star' as const;
export const LUCIDE_MOON_STAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 5h4' }),
  svg.path({ d: 'M20 3v4' }),
  svg.path({
    d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
  }),
];

export function renderLucideMoonStarIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOON_STAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-moon-star-icon',
  prototypeName: 'lucide-moon-star-icon',
  shapeFactory: LUCIDE_MOON_STAR_SHAPE_FACTORY,
});

export const asLucideMoonStarIcon = fixed.asHook;
export const lucideMoonStarIcon = fixed.prototype;
export default lucideMoonStarIcon;
