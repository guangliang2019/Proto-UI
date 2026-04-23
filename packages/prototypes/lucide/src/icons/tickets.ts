// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tickets' as const;
export const LUCIDE_TICKETS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8' }),
  svg.path({ d: 'M6 10V8' }),
  svg.path({ d: 'M6 14v1' }),
  svg.path({ d: 'M6 19v2' }),
  svg.rect({ x: 2, y: 8, width: 20, height: 13, rx: 2 }),
];

export function renderLucideTicketsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TICKETS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tickets-icon',
  prototypeName: 'lucide-tickets-icon',
  shapeFactory: LUCIDE_TICKETS_SHAPE_FACTORY,
});

export const asLucideTicketsIcon = fixed.asHook;
export const lucideTicketsIcon = fixed.prototype;
export default lucideTicketsIcon;
