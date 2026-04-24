// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'inbox' as const;
export const LUCIDE_INBOX_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.polyline({ points: '22 12 16 12 14 15 10 15 8 12 2 12' }),
  svg.path({
    d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
  }),
];

export function renderLucideInboxIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_INBOX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-inbox-icon',
  prototypeName: 'lucide-inbox-icon',
  shapeFactory: LUCIDE_INBOX_SHAPE_FACTORY,
});

export const asLucideInboxIcon = fixed.asHook;
export const lucideInboxIcon = fixed.prototype;
export default lucideInboxIcon;
