// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mountain-snow' as const;
export const LUCIDE_MOUNTAIN_SNOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm8 3 4 8 5-5 5 15H2L8 3z' }),
  svg.path({ d: 'M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19' }),
];

export function renderLucideMountainSnowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUNTAIN_SNOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mountain-snow-icon',
  prototypeName: 'lucide-mountain-snow-icon',
  shapeFactory: LUCIDE_MOUNTAIN_SNOW_SHAPE_FACTORY,
});

export const asLucideMountainSnowIcon = fixed.asHook;
export const lucideMountainSnowIcon = fixed.prototype;
export default lucideMountainSnowIcon;
