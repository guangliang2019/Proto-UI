// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'crosshair' as const;
export const LUCIDE_CROSSHAIR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.line({ x1: 22, x2: 18, y1: 12, y2: 12 }),
  svg.line({ x1: 6, x2: 2, y1: 12, y2: 12 }),
  svg.line({ x1: 12, x2: 12, y1: 6, y2: 2 }),
  svg.line({ x1: 12, x2: 12, y1: 22, y2: 18 }),
];

export function renderLucideCrosshairIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CROSSHAIR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-crosshair-icon',
  prototypeName: 'lucide-crosshair-icon',
  shapeFactory: LUCIDE_CROSSHAIR_SHAPE_FACTORY,
});

export const asLucideCrosshairIcon = fixed.asHook;
export const lucideCrosshairIcon = fixed.prototype;
export default lucideCrosshairIcon;
