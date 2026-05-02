// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rectangle-vertical' as const;
export const LUCIDE_RECTANGLE_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.rect({ width: 12, height: 20, x: 6, y: 2, rx: 2 });

export function renderLucideRectangleVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RECTANGLE_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rectangle-vertical-icon',
  prototypeName: 'lucide-rectangle-vertical-icon',
  shapeFactory: LUCIDE_RECTANGLE_VERTICAL_SHAPE_FACTORY,
});

export const asLucideRectangleVerticalIcon = fixed.asHook;
export const lucideRectangleVerticalIcon = fixed.prototype;
export default lucideRectangleVerticalIcon;
