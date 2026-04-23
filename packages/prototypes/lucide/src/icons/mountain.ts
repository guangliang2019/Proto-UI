// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mountain' as const;
export const LUCIDE_MOUNTAIN_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'm8 3 4 8 5-5 5 15H2L8 3z' });

export function renderLucideMountainIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUNTAIN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mountain-icon',
  prototypeName: 'lucide-mountain-icon',
  shapeFactory: LUCIDE_MOUNTAIN_SHAPE_FACTORY,
});

export const asLucideMountainIcon = fixed.asHook;
export const lucideMountainIcon = fixed.prototype;
export default lucideMountainIcon;
