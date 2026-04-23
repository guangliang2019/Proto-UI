// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ruler-dimension-line' as const;
export const LUCIDE_RULER_DIMENSION_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 15v-3' }),
  svg.path({ d: 'M14 15v-3' }),
  svg.path({ d: 'M18 15v-3' }),
  svg.path({ d: 'M2 8V4' }),
  svg.path({ d: 'M22 6H2' }),
  svg.path({ d: 'M22 8V4' }),
  svg.path({ d: 'M6 15v-3' }),
  svg.rect({ x: 2, y: 12, width: 20, height: 8, rx: 2 }),
];

export function renderLucideRulerDimensionLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RULER_DIMENSION_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ruler-dimension-line-icon',
  prototypeName: 'lucide-ruler-dimension-line-icon',
  shapeFactory: LUCIDE_RULER_DIMENSION_LINE_SHAPE_FACTORY,
});

export const asLucideRulerDimensionLineIcon = fixed.asHook;
export const lucideRulerDimensionLineIcon = fixed.prototype;
export default lucideRulerDimensionLineIcon;
