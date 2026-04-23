// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-left' as const;
export const LUCIDE_SQUARE_ARROW_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm12 8-4 4 4 4' }),
  svg.path({ d: 'M16 12H8' }),
];

export function renderLucideSquareArrowLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-left-icon',
  prototypeName: 'lucide-square-arrow-left-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_LEFT_SHAPE_FACTORY,
});

export const asLucideSquareArrowLeftIcon = fixed.asHook;
export const lucideSquareArrowLeftIcon = fixed.prototype;
export default lucideSquareArrowLeftIcon;
