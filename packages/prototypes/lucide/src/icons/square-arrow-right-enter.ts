// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-right-enter' as const;
export const LUCIDE_SQUARE_ARROW_RIGHT_ENTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 16 4-4-4-4' }),
  svg.path({ d: 'M3 12h11' }),
  svg.path({ d: 'M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3' }),
];

export function renderLucideSquareArrowRightEnterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_RIGHT_ENTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-right-enter-icon',
  prototypeName: 'lucide-square-arrow-right-enter-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_RIGHT_ENTER_SHAPE_FACTORY,
});

export const asLucideSquareArrowRightEnterIcon = fixed.asHook;
export const lucideSquareArrowRightEnterIcon = fixed.prototype;
export default lucideSquareArrowRightEnterIcon;
