// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar' as const;
export const LUCIDE_CALENDAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 2v4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 4, rx: 2 }),
  svg.path({ d: 'M3 10h18' }),
];

export function renderLucideCalendarIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-icon',
  prototypeName: 'lucide-calendar-icon',
  shapeFactory: LUCIDE_CALENDAR_SHAPE_FACTORY,
});

export const asLucideCalendarIcon = fixed.asHook;
export const lucideCalendarIcon = fixed.prototype;
export default lucideCalendarIcon;
