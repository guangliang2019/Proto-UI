// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-right-exit' as const;
export const LUCIDE_SQUARE_ARROW_RIGHT_EXIT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12h11' }),
  svg.path({ d: 'm17 16 4-4-4-4' }),
  svg.path({
    d: 'M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344',
  }),
];

export function renderLucideSquareArrowRightExitIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_RIGHT_EXIT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-right-exit-icon',
  prototypeName: 'lucide-square-arrow-right-exit-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_RIGHT_EXIT_SHAPE_FACTORY,
});

export const asLucideSquareArrowRightExitIcon = fixed.asHook;
export const lucideSquareArrowRightExitIcon = fixed.prototype;
export default lucideSquareArrowRightExitIcon;
