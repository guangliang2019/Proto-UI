// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-range' as const;
export const LUCIDE_CALENDAR_RANGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 4, rx: 2 }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'M8 2v4' }),
  svg.path({ d: 'M17 14h-6' }),
  svg.path({ d: 'M13 18H7' }),
  svg.path({ d: 'M7 14h.01' }),
  svg.path({ d: 'M17 18h.01' }),
];

export function renderLucideCalendarRangeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_RANGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-range-icon',
  prototypeName: 'lucide-calendar-range-icon',
  shapeFactory: LUCIDE_CALENDAR_RANGE_SHAPE_FACTORY,
});

export const asLucideCalendarRangeIcon = fixed.asHook;
export const lucideCalendarRangeIcon = fixed.prototype;
export default lucideCalendarRangeIcon;
