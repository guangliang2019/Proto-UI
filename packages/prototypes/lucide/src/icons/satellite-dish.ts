// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'satellite-dish' as const;
export const LUCIDE_SATELLITE_DISH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 10a7.31 7.31 0 0 0 10 10Z' }),
  svg.path({ d: 'm9 15 3-3' }),
  svg.path({ d: 'M17 13a6 6 0 0 0-6-6' }),
  svg.path({ d: 'M21 13A10 10 0 0 0 11 3' }),
];

export function renderLucideSatelliteDishIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SATELLITE_DISH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-satellite-dish-icon',
  prototypeName: 'lucide-satellite-dish-icon',
  shapeFactory: LUCIDE_SATELLITE_DISH_SHAPE_FACTORY,
});

export const asLucideSatelliteDishIcon = fixed.asHook;
export const lucideSatelliteDishIcon = fixed.prototype;
export default lucideSatelliteDishIcon;
