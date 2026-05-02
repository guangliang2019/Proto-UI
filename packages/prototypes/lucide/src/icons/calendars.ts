// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calendars' as const;
export const LUCIDE_CALENDARS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2' }),
  svg.path({ d: 'M18 2v2' }),
  svg.path({ d: 'M2 13h2' }),
  svg.path({ d: 'M8 8h14' }),
  svg.rect({ x: 8, y: 3, width: 14, height: 14, rx: 2 }),
];

export function renderLucideCalendarsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALENDARS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calendars-icon',
  prototypeName: 'lucide-calendars-icon',
  shapeFactory: LUCIDE_CALENDARS_SHAPE_FACTORY,
});

export const asLucideCalendarsIcon = fixed.asHook;
export const lucideCalendarsIcon = fixed.prototype;
export default lucideCalendarsIcon;
