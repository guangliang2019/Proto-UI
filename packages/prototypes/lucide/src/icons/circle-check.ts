// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-check' as const;
export const LUCIDE_CIRCLE_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm9 12 2 2 4-4' }),
];

export function renderLucideCircleCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-check-icon',
  prototypeName: 'lucide-circle-check-icon',
  shapeFactory: LUCIDE_CIRCLE_CHECK_SHAPE_FACTORY,
});

export const asLucideCircleCheckIcon = fixed.asHook;
export const lucideCircleCheckIcon = fixed.prototype;
export default lucideCircleCheckIcon;
