// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rectangle-horizontal' as const;
export const LUCIDE_RECTANGLE_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.rect({ width: 20, height: 12, x: 2, y: 6, rx: 2 });

export function renderLucideRectangleHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RECTANGLE_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rectangle-horizontal-icon',
  prototypeName: 'lucide-rectangle-horizontal-icon',
  shapeFactory: LUCIDE_RECTANGLE_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideRectangleHorizontalIcon = fixed.asHook;
export const lucideRectangleHorizontalIcon = fixed.prototype;
export default lucideRectangleHorizontalIcon;
