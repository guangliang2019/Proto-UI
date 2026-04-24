// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'frown' as const;
export const LUCIDE_FROWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M16 16s-1.5-2-4-2-4 2-4 2' }),
  svg.line({ x1: 9, x2: 9.01, y1: 9, y2: 9 }),
  svg.line({ x1: 15, x2: 15.01, y1: 9, y2: 9 }),
];

export function renderLucideFrownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FROWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-frown-icon',
  prototypeName: 'lucide-frown-icon',
  shapeFactory: LUCIDE_FROWN_SHAPE_FACTORY,
});

export const asLucideFrownIcon = fixed.asHook;
export const lucideFrownIcon = fixed.prototype;
export default lucideFrownIcon;
