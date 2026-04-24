// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-off' as const;
export const LUCIDE_CALENDAR_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18' }),
  svg.path({ d: 'M21 15.5V6a2 2 0 0 0-2-2H9.5' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M3 10h7' }),
  svg.path({ d: 'M21 10h-5.5' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideCalendarOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-off-icon',
  prototypeName: 'lucide-calendar-off-icon',
  shapeFactory: LUCIDE_CALENDAR_OFF_SHAPE_FACTORY,
});

export const asLucideCalendarOffIcon = fixed.asHook;
export const lucideCalendarOffIcon = fixed.prototype;
export default lucideCalendarOffIcon;
