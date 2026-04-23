// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-check-2' as const;
export const LUCIDE_CALENDAR_CHECK_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 2v4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8' }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'm16 20 2 2 4-4' }),
];

export function renderLucideCalendarCheck2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_CHECK_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-check-2-icon',
  prototypeName: 'lucide-calendar-check-2-icon',
  shapeFactory: LUCIDE_CALENDAR_CHECK_2_SHAPE_FACTORY,
});

export const asLucideCalendarCheck2Icon = fixed.asHook;
export const lucideCalendarCheck2Icon = fixed.prototype;
export default lucideCalendarCheck2Icon;
