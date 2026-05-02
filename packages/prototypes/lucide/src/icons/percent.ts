// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'percent' as const;
export const LUCIDE_PERCENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 19, x2: 5, y1: 5, y2: 19 }),
  svg.circle({ cx: 6.5, cy: 6.5, r: 2.5 }),
  svg.circle({ cx: 17.5, cy: 17.5, r: 2.5 }),
];

export function renderLucidePercentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PERCENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-percent-icon',
  prototypeName: 'lucide-percent-icon',
  shapeFactory: LUCIDE_PERCENT_SHAPE_FACTORY,
});

export const asLucidePercentIcon = fixed.asHook;
export const lucidePercentIcon = fixed.prototype;
export default lucidePercentIcon;
