// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'triangle-right' as const;
export const LUCIDE_TRIANGLE_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z' });

export function renderLucideTriangleRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRIANGLE_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-triangle-right-icon',
  prototypeName: 'lucide-triangle-right-icon',
  shapeFactory: LUCIDE_TRIANGLE_RIGHT_SHAPE_FACTORY,
});

export const asLucideTriangleRightIcon = fixed.asHook;
export const lucideTriangleRightIcon = fixed.prototype;
export default lucideTriangleRightIcon;
