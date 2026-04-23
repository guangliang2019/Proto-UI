// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flag-triangle-left' as const;
export const LUCIDE_FLAG_TRIANGLE_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5' });

export function renderLucideFlagTriangleLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLAG_TRIANGLE_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flag-triangle-left-icon',
  prototypeName: 'lucide-flag-triangle-left-icon',
  shapeFactory: LUCIDE_FLAG_TRIANGLE_LEFT_SHAPE_FACTORY,
});

export const asLucideFlagTriangleLeftIcon = fixed.asHook;
export const lucideFlagTriangleLeftIcon = fixed.prototype;
export default lucideFlagTriangleLeftIcon;
