// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-user' as const;
export const LUCIDE_SQUARE_USER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.circle({ cx: 12, cy: 10, r: 3 }),
  svg.path({ d: 'M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2' }),
];

export function renderLucideSquareUserIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_USER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-user-icon',
  prototypeName: 'lucide-square-user-icon',
  shapeFactory: LUCIDE_SQUARE_USER_SHAPE_FACTORY,
});

export const asLucideSquareUserIcon = fixed.asHook;
export const lucideSquareUserIcon = fixed.prototype;
export default lucideSquareUserIcon;
