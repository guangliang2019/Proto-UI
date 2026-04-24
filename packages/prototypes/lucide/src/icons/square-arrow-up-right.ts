// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-up-right' as const;
export const LUCIDE_SQUARE_ARROW_UP_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M8 8h8v8' }),
  svg.path({ d: 'm8 16 8-8' }),
];

export function renderLucideSquareArrowUpRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_UP_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-up-right-icon',
  prototypeName: 'lucide-square-arrow-up-right-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_UP_RIGHT_SHAPE_FACTORY,
});

export const asLucideSquareArrowUpRightIcon = fixed.asHook;
export const lucideSquareArrowUpRightIcon = fixed.prototype;
export default lucideSquareArrowUpRightIcon;
