// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-out-down-right' as const;
export const LUCIDE_SQUARE_ARROW_OUT_DOWN_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6' }),
  svg.path({ d: 'm21 21-9-9' }),
  svg.path({ d: 'M21 15v6h-6' }),
];

export function renderLucideSquareArrowOutDownRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_OUT_DOWN_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-out-down-right-icon',
  prototypeName: 'lucide-square-arrow-out-down-right-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_OUT_DOWN_RIGHT_SHAPE_FACTORY,
});

export const asLucideSquareArrowOutDownRightIcon = fixed.asHook;
export const lucideSquareArrowOutDownRightIcon = fixed.prototype;
export default lucideSquareArrowOutDownRightIcon;
