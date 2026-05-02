// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-alert' as const;
export const LUCIDE_CIRCLE_ALERT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.line({ x1: 12, x2: 12, y1: 8, y2: 12 }),
  svg.line({ x1: 12, x2: 12.01, y1: 16, y2: 16 }),
];

export function renderLucideCircleAlertIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ALERT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-alert-icon',
  prototypeName: 'lucide-circle-alert-icon',
  shapeFactory: LUCIDE_CIRCLE_ALERT_SHAPE_FACTORY,
});

export const asLucideCircleAlertIcon = fixed.asHook;
export const lucideCircleAlertIcon = fixed.prototype;
export default lucideCircleAlertIcon;
