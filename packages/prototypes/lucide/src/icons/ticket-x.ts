// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ticket-x' as const;
export const LUCIDE_TICKET_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
  }),
  svg.path({ d: 'm9.5 14.5 5-5' }),
  svg.path({ d: 'm9.5 9.5 5 5' }),
];

export function renderLucideTicketXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TICKET_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ticket-x-icon',
  prototypeName: 'lucide-ticket-x-icon',
  shapeFactory: LUCIDE_TICKET_X_SHAPE_FACTORY,
});

export const asLucideTicketXIcon = fixed.asHook;
export const lucideTicketXIcon = fixed.prototype;
export default lucideTicketXIcon;
