// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-up' as const;
export const LUCIDE_SQUARE_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm16 12-4-4-4 4' }),
  svg.path({ d: 'M12 16V8' }),
];

export function renderLucideSquareArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-up-icon',
  prototypeName: 'lucide-square-arrow-up-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideSquareArrowUpIcon = fixed.asHook;
export const lucideSquareArrowUpIcon = fixed.prototype;
export default lucideSquareArrowUpIcon;
