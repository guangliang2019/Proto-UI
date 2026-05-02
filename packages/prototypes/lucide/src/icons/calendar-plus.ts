// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-plus' as const;
export const LUCIDE_CALENDAR_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 19h6' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M19 16v6' }),
  svg.path({ d: 'M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5' }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'M8 2v4' }),
];

export function renderLucideCalendarPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-plus-icon',
  prototypeName: 'lucide-calendar-plus-icon',
  shapeFactory: LUCIDE_CALENDAR_PLUS_SHAPE_FACTORY,
});

export const asLucideCalendarPlusIcon = fixed.asHook;
export const lucideCalendarPlusIcon = fixed.prototype;
export default lucideCalendarPlusIcon;
