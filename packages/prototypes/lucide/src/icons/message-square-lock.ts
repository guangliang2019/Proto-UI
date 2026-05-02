// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-square-lock' as const;
export const LUCIDE_MESSAGE_SQUARE_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10',
  }),
  svg.path({ d: 'M20 15v-2a2 2 0 0 0-4 0v2' }),
  svg.rect({ x: 14, y: 15, width: 8, height: 5, rx: 1 }),
];

export function renderLucideMessageSquareLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_SQUARE_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-square-lock-icon',
  prototypeName: 'lucide-message-square-lock-icon',
  shapeFactory: LUCIDE_MESSAGE_SQUARE_LOCK_SHAPE_FACTORY,
});

export const asLucideMessageSquareLockIcon = fixed.asHook;
export const lucideMessageSquareLockIcon = fixed.prototype;
export default lucideMessageSquareLockIcon;
