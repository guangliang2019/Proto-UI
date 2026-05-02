// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-right' as const;
export const LUCIDE_SQUARE_ARROW_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M8 12h8' }),
  svg.path({ d: 'm12 16 4-4-4-4' }),
];

export function renderLucideSquareArrowRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-right-icon',
  prototypeName: 'lucide-square-arrow-right-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_RIGHT_SHAPE_FACTORY,
});

export const asLucideSquareArrowRightIcon = fixed.asHook;
export const lucideSquareArrowRightIcon = fixed.prototype;
export default lucideSquareArrowRightIcon;
