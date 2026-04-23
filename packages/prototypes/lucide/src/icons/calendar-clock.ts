// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-clock' as const;
export const LUCIDE_CALENDAR_CLOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 14v2.2l1.6 1' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5' }),
  svg.path({ d: 'M3 10h5' }),
  svg.path({ d: 'M8 2v4' }),
  svg.circle({ cx: 16, cy: 16, r: 6 }),
];

export function renderLucideCalendarClockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_CLOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-clock-icon',
  prototypeName: 'lucide-calendar-clock-icon',
  shapeFactory: LUCIDE_CALENDAR_CLOCK_SHAPE_FACTORY,
});

export const asLucideCalendarClockIcon = fixed.asHook;
export const lucideCalendarClockIcon = fixed.prototype;
export default lucideCalendarClockIcon;
