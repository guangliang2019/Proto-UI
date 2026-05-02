// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-percent' as const;
export const LUCIDE_CIRCLE_PERCENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm15 9-6 6' }),
  svg.path({ d: 'M9 9h.01' }),
  svg.path({ d: 'M15 15h.01' }),
];

export function renderLucideCirclePercentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_PERCENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-percent-icon',
  prototypeName: 'lucide-circle-percent-icon',
  shapeFactory: LUCIDE_CIRCLE_PERCENT_SHAPE_FACTORY,
});

export const asLucideCirclePercentIcon = fixed.asHook;
export const lucideCirclePercentIcon = fixed.prototype;
export default lucideCirclePercentIcon;
