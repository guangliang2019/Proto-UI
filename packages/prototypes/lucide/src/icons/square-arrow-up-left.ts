// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-up-left' as const;
export const LUCIDE_SQUARE_ARROW_UP_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M8 16V8h8' }),
  svg.path({ d: 'M16 16 8 8' }),
];

export function renderLucideSquareArrowUpLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_UP_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-up-left-icon',
  prototypeName: 'lucide-square-arrow-up-left-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_UP_LEFT_SHAPE_FACTORY,
});

export const asLucideSquareArrowUpLeftIcon = fixed.asHook;
export const lucideSquareArrowUpLeftIcon = fixed.prototype;
export default lucideSquareArrowUpLeftIcon;
