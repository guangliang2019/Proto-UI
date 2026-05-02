// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-plus-2' as const;
export const LUCIDE_CALENDAR_PLUS_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 2v4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 4, rx: 2 }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'M10 16h4' }),
  svg.path({ d: 'M12 14v4' }),
];

export function renderLucideCalendarPlus2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_PLUS_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-plus-2-icon',
  prototypeName: 'lucide-calendar-plus-2-icon',
  shapeFactory: LUCIDE_CALENDAR_PLUS_2_SHAPE_FACTORY,
});

export const asLucideCalendarPlus2Icon = fixed.asHook;
export const lucideCalendarPlus2Icon = fixed.prototype;
export default lucideCalendarPlus2Icon;
