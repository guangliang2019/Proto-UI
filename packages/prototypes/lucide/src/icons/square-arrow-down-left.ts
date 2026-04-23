// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-down-left' as const;
export const LUCIDE_SQUARE_ARROW_DOWN_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm16 8-8 8' }),
  svg.path({ d: 'M16 16H8V8' }),
];

export function renderLucideSquareArrowDownLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_DOWN_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-down-left-icon',
  prototypeName: 'lucide-square-arrow-down-left-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_DOWN_LEFT_SHAPE_FACTORY,
});

export const asLucideSquareArrowDownLeftIcon = fixed.asHook;
export const lucideSquareArrowDownLeftIcon = fixed.prototype;
export default lucideSquareArrowDownLeftIcon;
