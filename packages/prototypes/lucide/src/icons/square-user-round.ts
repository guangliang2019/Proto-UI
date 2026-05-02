// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-user-round' as const;
export const LUCIDE_SQUARE_USER_ROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 21a6 6 0 0 0-12 0' }),
  svg.circle({ cx: 12, cy: 11, r: 4 }),
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
];

export function renderLucideSquareUserRoundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_USER_ROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-user-round-icon',
  prototypeName: 'lucide-square-user-round-icon',
  shapeFactory: LUCIDE_SQUARE_USER_ROUND_SHAPE_FACTORY,
});

export const asLucideSquareUserRoundIcon = fixed.asHook;
export const lucideSquareUserRoundIcon = fixed.prototype;
export default lucideSquareUserRoundIcon;
