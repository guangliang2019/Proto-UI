// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendar-fold' as const;
export const LUCIDE_CALENDAR_FOLD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3 20a2 2 0 0 0 2 2h10a2.4 2.4 0 0 0 1.706-.706l3.588-3.588A2.4 2.4 0 0 0 21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z',
  }),
  svg.path({ d: 'M15 22v-5a1 1 0 0 1 1-1h5' }),
  svg.path({ d: 'M8 2v4' }),
  svg.path({ d: 'M16 2v4' }),
  svg.path({ d: 'M3 10h18' }),
];

export function renderLucideCalendarFoldIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDAR_FOLD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendar-fold-icon',
  prototypeName: 'lucide-calendar-fold-icon',
  shapeFactory: LUCIDE_CALENDAR_FOLD_SHAPE_FACTORY,
});

export const asLucideCalendarFoldIcon = fixed.asHook;
export const lucideCalendarFoldIcon = fixed.prototype;
export default lucideCalendarFoldIcon;
