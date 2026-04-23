// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-square' as const;
export const LUCIDE_SQUARE_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
  svg.rect({ x: 8, y: 8, width: 8, height: 8, rx: 1 }),
];

export function renderLucideSquareSquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-square-icon',
  prototypeName: 'lucide-square-square-icon',
  shapeFactory: LUCIDE_SQUARE_SQUARE_SHAPE_FACTORY,
});

export const asLucideSquareSquareIcon = fixed.asHook;
export const lucideSquareSquareIcon = fixed.prototype;
export default lucideSquareSquareIcon;
