// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mars-stroke' as const;
export const LUCIDE_MARS_STROKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14 6 4 4' }),
  svg.path({ d: 'M17 3h4v4' }),
  svg.path({ d: 'm21 3-7.75 7.75' }),
  svg.circle({ cx: 9, cy: 15, r: 6 }),
];

export function renderLucideMarsStrokeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MARS_STROKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mars-stroke-icon',
  prototypeName: 'lucide-mars-stroke-icon',
  shapeFactory: LUCIDE_MARS_STROKE_SHAPE_FACTORY,
});

export const asLucideMarsStrokeIcon = fixed.asHook;
export const lucideMarsStrokeIcon = fixed.prototype;
export default lucideMarsStrokeIcon;
