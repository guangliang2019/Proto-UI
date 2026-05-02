// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'meh' as const;
export const LUCIDE_MEH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.line({ x1: 8, x2: 16, y1: 15, y2: 15 }),
  svg.line({ x1: 9, x2: 9.01, y1: 9, y2: 9 }),
  svg.line({ x1: 15, x2: 15.01, y1: 9, y2: 9 }),
];

export function renderLucideMehIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MEH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-meh-icon',
  prototypeName: 'lucide-meh-icon',
  shapeFactory: LUCIDE_MEH_SHAPE_FACTORY,
});

export const asLucideMehIcon = fixed.asHook;
export const lucideMehIcon = fixed.prototype;
export default lucideMehIcon;
