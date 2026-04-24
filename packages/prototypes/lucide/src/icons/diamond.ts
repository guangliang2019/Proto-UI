// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'diamond' as const;
export const LUCIDE_DIAMOND_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z',
  });

export function renderLucideDiamondIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DIAMOND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-diamond-icon',
  prototypeName: 'lucide-diamond-icon',
  shapeFactory: LUCIDE_DIAMOND_SHAPE_FACTORY,
});

export const asLucideDiamondIcon = fixed.asHook;
export const lucideDiamondIcon = fixed.prototype;
export default lucideDiamondIcon;
