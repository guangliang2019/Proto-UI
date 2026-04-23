// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cast' as const;
export const LUCIDE_CAST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6' }),
  svg.path({ d: 'M2 12a9 9 0 0 1 8 8' }),
  svg.path({ d: 'M2 16a5 5 0 0 1 4 4' }),
  svg.line({ x1: 2, x2: 2.01, y1: 20, y2: 20 }),
];

export function renderLucideCastIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CAST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cast-icon',
  prototypeName: 'lucide-cast-icon',
  shapeFactory: LUCIDE_CAST_SHAPE_FACTORY,
});

export const asLucideCastIcon = fixed.asHook;
export const lucideCastIcon = fixed.prototype;
export default lucideCastIcon;
