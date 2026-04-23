// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mailbox' as const;
export const LUCIDE_MAILBOX_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z' }),
  svg.polyline({ points: '15,9 18,9 18,11' }),
  svg.path({ d: 'M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2' }),
  svg.line({ x1: 6, x2: 7, y1: 10, y2: 10 }),
];

export function renderLucideMailboxIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAILBOX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mailbox-icon',
  prototypeName: 'lucide-mailbox-icon',
  shapeFactory: LUCIDE_MAILBOX_SHAPE_FACTORY,
});

export const asLucideMailboxIcon = fixed.asHook;
export const lucideMailboxIcon = fixed.prototype;
export default lucideMailboxIcon;
