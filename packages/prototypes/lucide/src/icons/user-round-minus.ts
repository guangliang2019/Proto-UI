// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round-minus' as const;
export const LUCIDE_USER_ROUND_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 21a8 8 0 0 1 13.292-6' }),
  svg.circle({ cx: 10, cy: 8, r: 5 }),
  svg.path({ d: 'M22 19h-6' }),
];

export function renderLucideUserRoundMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-minus-icon',
  prototypeName: 'lucide-user-round-minus-icon',
  shapeFactory: LUCIDE_USER_ROUND_MINUS_SHAPE_FACTORY,
});

export const asLucideUserRoundMinusIcon = fixed.asHook;
export const lucideUserRoundMinusIcon = fixed.prototype;
export default lucideUserRoundMinusIcon;
