// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gauge' as const;
export const LUCIDE_GAUGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12 14 4-4' }),
  svg.path({ d: 'M3.34 19a10 10 0 1 1 17.32 0' }),
];

export function renderLucideGaugeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GAUGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gauge-icon',
  prototypeName: 'lucide-gauge-icon',
  shapeFactory: LUCIDE_GAUGE_SHAPE_FACTORY,
});

export const asLucideGaugeIcon = fixed.asHook;
export const lucideGaugeIcon = fixed.prototype;
export default lucideGaugeIcon;
