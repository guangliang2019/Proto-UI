// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'brush-cleaning' as const;
export const LUCIDE_BRUSH_CLEANING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 22-1-4' }),
  svg.path({
    d: 'M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1',
  }),
  svg.path({ d: 'M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z' }),
  svg.path({ d: 'm8 22 1-4' }),
];

export function renderLucideBrushCleaningIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRUSH_CLEANING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-brush-cleaning-icon',
  prototypeName: 'lucide-brush-cleaning-icon',
  shapeFactory: LUCIDE_BRUSH_CLEANING_SHAPE_FACTORY,
});

export const asLucideBrushCleaningIcon = fixed.asHook;
export const lucideBrushCleaningIcon = fixed.prototype;
export default lucideBrushCleaningIcon;
