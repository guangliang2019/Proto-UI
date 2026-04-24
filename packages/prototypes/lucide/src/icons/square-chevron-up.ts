// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-chevron-up' as const;
export const LUCIDE_SQUARE_CHEVRON_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm8 14 4-4 4 4' }),
];

export function renderLucideSquareChevronUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CHEVRON_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-chevron-up-icon',
  prototypeName: 'lucide-square-chevron-up-icon',
  shapeFactory: LUCIDE_SQUARE_CHEVRON_UP_SHAPE_FACTORY,
});

export const asLucideSquareChevronUpIcon = fixed.asHook;
export const lucideSquareChevronUpIcon = fixed.prototype;
export default lucideSquareChevronUpIcon;
