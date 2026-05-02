// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-chevron-left' as const;
export const LUCIDE_SQUARE_CHEVRON_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm14 16-4-4 4-4' }),
];

export function renderLucideSquareChevronLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CHEVRON_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-chevron-left-icon',
  prototypeName: 'lucide-square-chevron-left-icon',
  shapeFactory: LUCIDE_SQUARE_CHEVRON_LEFT_SHAPE_FACTORY,
});

export const asLucideSquareChevronLeftIcon = fixed.asHook;
export const lucideSquareChevronLeftIcon = fixed.prototype;
export default lucideSquareChevronLeftIcon;
