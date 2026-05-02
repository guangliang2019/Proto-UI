// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flag-triangle-right' as const;
export const LUCIDE_FLAG_TRIANGLE_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5' });

export function renderLucideFlagTriangleRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLAG_TRIANGLE_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flag-triangle-right-icon',
  prototypeName: 'lucide-flag-triangle-right-icon',
  shapeFactory: LUCIDE_FLAG_TRIANGLE_RIGHT_SHAPE_FACTORY,
});

export const asLucideFlagTriangleRightIcon = fixed.asHook;
export const lucideFlagTriangleRightIcon = fixed.prototype;
export default lucideFlagTriangleRightIcon;
