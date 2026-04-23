// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'divide' as const;
export const LUCIDE_DIVIDE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 6, r: 1 }),
  svg.line({ x1: 5, x2: 19, y1: 12, y2: 12 }),
  svg.circle({ cx: 12, cy: 18, r: 1 }),
];

export function renderLucideDivideIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DIVIDE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-divide-icon',
  prototypeName: 'lucide-divide-icon',
  shapeFactory: LUCIDE_DIVIDE_SHAPE_FACTORY,
});

export const asLucideDivideIcon = fixed.asHook;
export const lucideDivideIcon = fixed.prototype;
export default lucideDivideIcon;
