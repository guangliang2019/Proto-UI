// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-arrow-up' as const;
export const LUCIDE_CALENDAR_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14 18 4-4 4 4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M18 22v-8' }),
  svg.path({ d: 'M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9' }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'M8 2v4' }),
];

export function renderLucideCalendarArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-arrow-up-icon',
  prototypeName: 'lucide-calendar-arrow-up-icon',
  shapeFactory: LUCIDE_CALENDAR_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideCalendarArrowUpIcon = fixed.asHook;
export const lucideCalendarArrowUpIcon = fixed.prototype;
export default lucideCalendarArrowUpIcon;
