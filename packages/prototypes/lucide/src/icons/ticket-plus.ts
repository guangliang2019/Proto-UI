// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ticket-plus' as const;
export const LUCIDE_TICKET_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
  }),
  svg.path({ d: 'M9 12h6' }),
  svg.path({ d: 'M12 9v6' }),
];

export function renderLucideTicketPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TICKET_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ticket-plus-icon',
  prototypeName: 'lucide-ticket-plus-icon',
  shapeFactory: LUCIDE_TICKET_PLUS_SHAPE_FACTORY,
});

export const asLucideTicketPlusIcon = fixed.asHook;
export const lucideTicketPlusIcon = fixed.prototype;
export default lucideTicketPlusIcon;
