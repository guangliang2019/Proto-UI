// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ticket-percent' as const;
export const LUCIDE_TICKET_PERCENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
  }),
  svg.path({ d: 'M9 9h.01' }),
  svg.path({ d: 'm15 9-6 6' }),
  svg.path({ d: 'M15 15h.01' }),
];

export function renderLucideTicketPercentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TICKET_PERCENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ticket-percent-icon',
  prototypeName: 'lucide-ticket-percent-icon',
  shapeFactory: LUCIDE_TICKET_PERCENT_SHAPE_FACTORY,
});

export const asLucideTicketPercentIcon = fixed.asHook;
export const lucideTicketPercentIcon = fixed.prototype;
export default lucideTicketPercentIcon;
