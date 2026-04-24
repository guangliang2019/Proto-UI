// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-chevron-right' as const;
export const LUCIDE_SQUARE_CHEVRON_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm10 8 4 4-4 4' }),
];

export function renderLucideSquareChevronRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CHEVRON_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-chevron-right-icon',
  prototypeName: 'lucide-square-chevron-right-icon',
  shapeFactory: LUCIDE_SQUARE_CHEVRON_RIGHT_SHAPE_FACTORY,
});

export const asLucideSquareChevronRightIcon = fixed.asHook;
export const lucideSquareChevronRightIcon = fixed.prototype;
export default lucideSquareChevronRightIcon;
