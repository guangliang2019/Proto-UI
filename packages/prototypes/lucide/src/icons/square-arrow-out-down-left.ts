// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-out-down-left' as const;
export const LUCIDE_SQUARE_ARROW_OUT_DOWN_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6' }),
  svg.path({ d: 'm3 21 9-9' }),
  svg.path({ d: 'M9 21H3v-6' }),
];

export function renderLucideSquareArrowOutDownLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_OUT_DOWN_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-out-down-left-icon',
  prototypeName: 'lucide-square-arrow-out-down-left-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_OUT_DOWN_LEFT_SHAPE_FACTORY,
});

export const asLucideSquareArrowOutDownLeftIcon = fixed.asHook;
export const lucideSquareArrowOutDownLeftIcon = fixed.prototype;
export default lucideSquareArrowOutDownLeftIcon;
