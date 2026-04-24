// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lens-convex' as const;
export const LUCIDE_LENS_CONVEX_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z',
  });

export function renderLucideLensConvexIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LENS_CONVEX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lens-convex-icon',
  prototypeName: 'lucide-lens-convex-icon',
  shapeFactory: LUCIDE_LENS_CONVEX_SHAPE_FACTORY,
});

export const asLucideLensConvexIcon = fixed.asHook;
export const lucideLensConvexIcon = fixed.prototype;
export default lucideLensConvexIcon;
