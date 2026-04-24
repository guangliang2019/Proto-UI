// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'brush' as const;
export const LUCIDE_BRUSH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm11 10 3 3' }),
  svg.path({ d: 'M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z' }),
  svg.path({ d: 'M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031' }),
];

export function renderLucideBrushIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRUSH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-brush-icon',
  prototypeName: 'lucide-brush-icon',
  shapeFactory: LUCIDE_BRUSH_SHAPE_FACTORY,
});

export const asLucideBrushIcon = fixed.asHook;
export const lucideBrushIcon = fixed.prototype;
export default lucideBrushIcon;
