// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-gauge' as const;
export const LUCIDE_CIRCLE_GAUGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15.6 2.7a10 10 0 1 0 5.7 5.7' }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
  svg.path({ d: 'M13.4 10.6 19 5' }),
];

export function renderLucideCircleGaugeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_GAUGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-gauge-icon',
  prototypeName: 'lucide-circle-gauge-icon',
  shapeFactory: LUCIDE_CIRCLE_GAUGE_SHAPE_FACTORY,
});

export const asLucideCircleGaugeIcon = fixed.asHook;
export const lucideCircleGaugeIcon = fixed.prototype;
export default lucideCircleGaugeIcon;
