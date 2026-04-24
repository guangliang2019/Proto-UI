// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'triangle' as const;
export const LUCIDE_TRIANGLE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' });

export function renderLucideTriangleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRIANGLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-triangle-icon',
  prototypeName: 'lucide-triangle-icon',
  shapeFactory: LUCIDE_TRIANGLE_SHAPE_FACTORY,
});

export const asLucideTriangleIcon = fixed.asHook;
export const lucideTriangleIcon = fixed.prototype;
export default lucideTriangleIcon;
