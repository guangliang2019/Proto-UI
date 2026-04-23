// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pentagon' as const;
export const LUCIDE_PENTAGON_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z',
  });

export function renderLucidePentagonIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PENTAGON_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pentagon-icon',
  prototypeName: 'lucide-pentagon-icon',
  shapeFactory: LUCIDE_PENTAGON_SHAPE_FACTORY,
});

export const asLucidePentagonIcon = fixed.asHook;
export const lucidePentagonIcon = fixed.prototype;
export default lucidePentagonIcon;
