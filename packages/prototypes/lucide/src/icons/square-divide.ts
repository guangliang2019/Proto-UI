// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-divide' as const;
export const LUCIDE_SQUARE_DIVIDE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.line({ x1: 8, x2: 16, y1: 12, y2: 12 }),
  svg.line({ x1: 12, x2: 12, y1: 16, y2: 16 }),
  svg.line({ x1: 12, x2: 12, y1: 8, y2: 8 }),
];

export function renderLucideSquareDivideIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_DIVIDE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-divide-icon',
  prototypeName: 'lucide-square-divide-icon',
  shapeFactory: LUCIDE_SQUARE_DIVIDE_SHAPE_FACTORY,
});

export const asLucideSquareDivideIcon = fixed.asHook;
export const lucideSquareDivideIcon = fixed.prototype;
export default lucideSquareDivideIcon;
