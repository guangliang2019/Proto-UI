// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-minus' as const;
export const LUCIDE_CIRCLE_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M8 12h8' }),
];

export function renderLucideCircleMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-minus-icon',
  prototypeName: 'lucide-circle-minus-icon',
  shapeFactory: LUCIDE_CIRCLE_MINUS_SHAPE_FACTORY,
});

export const asLucideCircleMinusIcon = fixed.asHook;
export const lucideCircleMinusIcon = fixed.prototype;
export default lucideCircleMinusIcon;
