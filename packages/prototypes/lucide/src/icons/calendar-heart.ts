// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-heart' as const;
export const LUCIDE_CALENDAR_HEART_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125' }),
  svg.path({
    d: 'M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z',
  }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M3 10h18' }),
  svg.path({ d: 'M8 2v4' }),
];

export function renderLucideCalendarHeartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_HEART_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-heart-icon',
  prototypeName: 'lucide-calendar-heart-icon',
  shapeFactory: LUCIDE_CALENDAR_HEART_SHAPE_FACTORY,
});

export const asLucideCalendarHeartIcon = fixed.asHook;
export const lucideCalendarHeartIcon = fixed.prototype;
export default lucideCalendarHeartIcon;
