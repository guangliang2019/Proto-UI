// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clock-alert' as const;
export const LUCIDE_CLOCK_ALERT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v6l4 2' }),
  svg.path({ d: 'M20 12v5' }),
  svg.path({ d: 'M20 21h.01' }),
  svg.path({ d: 'M21.25 8.2A10 10 0 1 0 16 21.16' }),
];

export function renderLucideClockAlertIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOCK_ALERT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clock-alert-icon',
  prototypeName: 'lucide-clock-alert-icon',
  shapeFactory: LUCIDE_CLOCK_ALERT_SHAPE_FACTORY,
});

export const asLucideClockAlertIcon = fixed.asHook;
export const lucideClockAlertIcon = fixed.prototype;
export default lucideClockAlertIcon;
