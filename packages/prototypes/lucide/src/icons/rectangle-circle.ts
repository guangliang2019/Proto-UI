// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rectangle-circle' as const;
export const LUCIDE_RECTANGLE_CIRCLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z' }),
  svg.circle({ cx: 14, cy: 12, r: 8 }),
];

export function renderLucideRectangleCircleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RECTANGLE_CIRCLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rectangle-circle-icon',
  prototypeName: 'lucide-rectangle-circle-icon',
  shapeFactory: LUCIDE_RECTANGLE_CIRCLE_SHAPE_FACTORY,
});

export const asLucideRectangleCircleIcon = fixed.asHook;
export const lucideRectangleCircleIcon = fixed.prototype;
export default lucideRectangleCircleIcon;
