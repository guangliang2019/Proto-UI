// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-check' as const;
export const LUCIDE_SQUARE_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm9 12 2 2 4-4' }),
];

export function renderLucideSquareCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-check-icon',
  prototypeName: 'lucide-square-check-icon',
  shapeFactory: LUCIDE_SQUARE_CHECK_SHAPE_FACTORY,
});

export const asLucideSquareCheckIcon = fixed.asHook;
export const lucideSquareCheckIcon = fixed.prototype;
export default lucideSquareCheckIcon;
