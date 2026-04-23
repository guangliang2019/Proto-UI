// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'alarm-clock' as const;
export const LUCIDE_ALARM_CLOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 13, r: 8 }),
  svg.path({ d: 'M12 9v4l2 2' }),
  svg.path({ d: 'M5 3 2 6' }),
  svg.path({ d: 'm22 6-3-3' }),
  svg.path({ d: 'M6.38 18.7 4 21' }),
  svg.path({ d: 'M17.64 18.67 20 21' }),
];

export function renderLucideAlarmClockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALARM_CLOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-alarm-clock-icon',
  prototypeName: 'lucide-alarm-clock-icon',
  shapeFactory: LUCIDE_ALARM_CLOCK_SHAPE_FACTORY,
});

export const asLucideAlarmClockIcon = fixed.asHook;
export const lucideAlarmClockIcon = fixed.prototype;
export default lucideAlarmClockIcon;
