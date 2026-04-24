// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-days' as const;
export const LUCIDE_CALENDAR_DAYS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 2v4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 4, rx: 2 }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'M8 14h.01' }),
  svg.path({ d: 'M12 14h.01' }),
  svg.path({ d: 'M16 14h.01' }),
  svg.path({ d: 'M8 18h.01' }),
  svg.path({ d: 'M12 18h.01' }),
  svg.path({ d: 'M16 18h.01' }),
];

export function renderLucideCalendarDaysIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_DAYS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-days-icon',
  prototypeName: 'lucide-calendar-days-icon',
  shapeFactory: LUCIDE_CALENDAR_DAYS_SHAPE_FACTORY,
});

export const asLucideCalendarDaysIcon = fixed.asHook;
export const lucideCalendarDaysIcon = fixed.prototype;
export default lucideCalendarDaysIcon;
