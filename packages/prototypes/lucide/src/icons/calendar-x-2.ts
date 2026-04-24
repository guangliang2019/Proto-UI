// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-x-2' as const;
export const LUCIDE_CALENDAR_X_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 2v4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8' }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'm17 22 5-5' }),
  svg.path({ d: 'm17 17 5 5' }),
];

export function renderLucideCalendarX2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_X_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-x-2-icon',
  prototypeName: 'lucide-calendar-x-2-icon',
  shapeFactory: LUCIDE_CALENDAR_X_2_SHAPE_FACTORY,
});

export const asLucideCalendarX2Icon = fixed.asHook;
export const lucideCalendarX2Icon = fixed.prototype;
export default lucideCalendarX2Icon;
