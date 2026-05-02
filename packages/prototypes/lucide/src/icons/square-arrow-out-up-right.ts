// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-out-up-right' as const;
export const LUCIDE_SQUARE_ARROW_OUT_UP_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6' }),
  svg.path({ d: 'm21 3-9 9' }),
  svg.path({ d: 'M15 3h6v6' }),
];

export function renderLucideSquareArrowOutUpRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_OUT_UP_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-out-up-right-icon',
  prototypeName: 'lucide-square-arrow-out-up-right-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_OUT_UP_RIGHT_SHAPE_FACTORY,
});

export const asLucideSquareArrowOutUpRightIcon = fixed.asHook;
export const lucideSquareArrowOutUpRightIcon = fixed.prototype;
export default lucideSquareArrowOutUpRightIcon;
