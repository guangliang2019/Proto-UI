// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pyramid' as const;
export const LUCIDE_PYRAMID_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z',
  }),
  svg.path({ d: 'M12 2v20' }),
];

export function renderLucidePyramidIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PYRAMID_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pyramid-icon',
  prototypeName: 'lucide-pyramid-icon',
  shapeFactory: LUCIDE_PYRAMID_SHAPE_FACTORY,
});

export const asLucidePyramidIcon = fixed.asHook;
export const lucidePyramidIcon = fixed.prototype;
export default lucidePyramidIcon;
