// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heart-minus' as const;
export const LUCIDE_HEART_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572',
  }),
  svg.path({ d: 'M15 15h6' }),
];

export function renderLucideHeartMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEART_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heart-minus-icon',
  prototypeName: 'lucide-heart-minus-icon',
  shapeFactory: LUCIDE_HEART_MINUS_SHAPE_FACTORY,
});

export const asLucideHeartMinusIcon = fixed.asHook;
export const lucideHeartMinusIcon = fixed.prototype;
export default lucideHeartMinusIcon;
