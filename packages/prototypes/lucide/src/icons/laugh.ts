// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'laugh' as const;
export const LUCIDE_LAUGH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z' }),
  svg.line({ x1: 9, x2: 9.01, y1: 9, y2: 9 }),
  svg.line({ x1: 15, x2: 15.01, y1: 9, y2: 9 }),
];

export function renderLucideLaughIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAUGH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-laugh-icon',
  prototypeName: 'lucide-laugh-icon',
  shapeFactory: LUCIDE_LAUGH_SHAPE_FACTORY,
});

export const asLucideLaughIcon = fixed.asHook;
export const lucideLaughIcon = fixed.prototype;
export default lucideLaughIcon;
