// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-chevron-down' as const;
export const LUCIDE_SQUARE_CHEVRON_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm16 10-4 4-4-4' }),
];

export function renderLucideSquareChevronDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CHEVRON_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-chevron-down-icon',
  prototypeName: 'lucide-square-chevron-down-icon',
  shapeFactory: LUCIDE_SQUARE_CHEVRON_DOWN_SHAPE_FACTORY,
});

export const asLucideSquareChevronDownIcon = fixed.asHook;
export const lucideSquareChevronDownIcon = fixed.prototype;
export default lucideSquareChevronDownIcon;
