// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-1' as const;
export const LUCIDE_CALENDAR_1_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 14h1v4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'M8 2v4' }),
  svg.rect({ x: 3, y: 4, width: 18, height: 18, rx: 2 }),
];

export function renderLucideCalendar1Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_1_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-1-icon',
  prototypeName: 'lucide-calendar-1-icon',
  shapeFactory: LUCIDE_CALENDAR_1_SHAPE_FACTORY,
});

export const asLucideCalendar1Icon = fixed.asHook;
export const lucideCalendar1Icon = fixed.prototype;
export default lucideCalendar1Icon;
