// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'alarm-clock-off' as const;
export const LUCIDE_ALARM_CLOCK_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6.87 6.87a8 8 0 1 0 11.26 11.26' }),
  svg.path({ d: 'M19.9 14.25a8 8 0 0 0-9.15-9.15' }),
  svg.path({ d: 'm22 6-3-3' }),
  svg.path({ d: 'M6.26 18.67 4 21' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M4 4 2 6' }),
];

export function renderLucideAlarmClockOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALARM_CLOCK_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-alarm-clock-off-icon',
  prototypeName: 'lucide-alarm-clock-off-icon',
  shapeFactory: LUCIDE_ALARM_CLOCK_OFF_SHAPE_FACTORY,
});

export const asLucideAlarmClockOffIcon = fixed.asHook;
export const lucideAlarmClockOffIcon = fixed.prototype;
export default lucideAlarmClockOffIcon;
