// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-out-up-left' as const;
export const LUCIDE_SQUARE_ARROW_OUT_UP_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6' }),
  svg.path({ d: 'm3 3 9 9' }),
  svg.path({ d: 'M3 9V3h6' }),
];

export function renderLucideSquareArrowOutUpLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_OUT_UP_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-out-up-left-icon',
  prototypeName: 'lucide-square-arrow-out-up-left-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_OUT_UP_LEFT_SHAPE_FACTORY,
});

export const asLucideSquareArrowOutUpLeftIcon = fixed.asHook;
export const lucideSquareArrowOutUpLeftIcon = fixed.prototype;
export default lucideSquareArrowOutUpLeftIcon;
