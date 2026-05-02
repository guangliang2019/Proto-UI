// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bike' as const;
export const LUCIDE_BIKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 18.5, cy: 17.5, r: 3.5 }),
  svg.circle({ cx: 5.5, cy: 17.5, r: 3.5 }),
  svg.circle({ cx: 15, cy: 5, r: 1 }),
  svg.path({ d: 'M12 17.5V14l-3-3 4-3 2 3h2' }),
];

export function renderLucideBikeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BIKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bike-icon',
  prototypeName: 'lucide-bike-icon',
  shapeFactory: LUCIDE_BIKE_SHAPE_FACTORY,
});

export const asLucideBikeIcon = fixed.asHook;
export const lucideBikeIcon = fixed.prototype;
export default lucideBikeIcon;
