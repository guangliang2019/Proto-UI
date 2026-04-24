// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-minus' as const;
export const LUCIDE_USER_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 9, cy: 7, r: 4 }),
  svg.line({ x1: 22, x2: 16, y1: 11, y2: 11 }),
];

export function renderLucideUserMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-minus-icon',
  prototypeName: 'lucide-user-minus-icon',
  shapeFactory: LUCIDE_USER_MINUS_SHAPE_FACTORY,
});

export const asLucideUserMinusIcon = fixed.asHook;
export const lucideUserMinusIcon = fixed.prototype;
export default lucideUserMinusIcon;
