// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'spline' as const;
export const LUCIDE_SPLINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 19, cy: 5, r: 2 }),
  svg.circle({ cx: 5, cy: 19, r: 2 }),
  svg.path({ d: 'M5 17A12 12 0 0 1 17 5' }),
];

export function renderLucideSplineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPLINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-spline-icon',
  prototypeName: 'lucide-spline-icon',
  shapeFactory: LUCIDE_SPLINE_SHAPE_FACTORY,
});

export const asLucideSplineIcon = fixed.asHook;
export const lucideSplineIcon = fixed.prototype;
export default lucideSplineIcon;
