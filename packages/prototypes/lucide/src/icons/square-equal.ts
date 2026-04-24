// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-equal' as const;
export const LUCIDE_SQUARE_EQUAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7 10h10' }),
  svg.path({ d: 'M7 14h10' }),
];

export function renderLucideSquareEqualIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_EQUAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-equal-icon',
  prototypeName: 'lucide-square-equal-icon',
  shapeFactory: LUCIDE_SQUARE_EQUAL_SHAPE_FACTORY,
});

export const asLucideSquareEqualIcon = fixed.asHook;
export const lucideSquareEqualIcon = fixed.prototype;
export default lucideSquareEqualIcon;
