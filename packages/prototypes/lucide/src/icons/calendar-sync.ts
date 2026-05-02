// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-sync' as const;
export const LUCIDE_CALENDAR_SYNC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 10v4h4' }),
  svg.path({ d: 'm11 14 1.535-1.605a5 5 0 0 1 8 1.5' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'm21 18-1.535 1.605a5 5 0 0 1-8-1.5' }),
  svg.path({ d: 'M21 22v-4h-4' }),
  svg.path({ d: 'M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3' }),
  svg.path({ d: 'M3 10h4' }),
  svg.path({ d: 'M8 2v4' }),
];

export function renderLucideCalendarSyncIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_SYNC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-sync-icon',
  prototypeName: 'lucide-calendar-sync-icon',
  shapeFactory: LUCIDE_CALENDAR_SYNC_SHAPE_FACTORY,
});

export const asLucideCalendarSyncIcon = fixed.asHook;
export const lucideCalendarSyncIcon = fixed.prototype;
export default lucideCalendarSyncIcon;
