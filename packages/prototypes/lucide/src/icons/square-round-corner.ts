// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-round-corner' as const;
export const LUCIDE_SQUARE_ROUND_CORNER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 11a8 8 0 0 0-8-8' }),
  svg.path({ d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
];

export function renderLucideSquareRoundCornerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ROUND_CORNER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-round-corner-icon',
  prototypeName: 'lucide-square-round-corner-icon',
  shapeFactory: LUCIDE_SQUARE_ROUND_CORNER_SHAPE_FACTORY,
});

export const asLucideSquareRoundCornerIcon = fixed.asHook;
export const lucideSquareRoundCornerIcon = fixed.prototype;
export default lucideSquareRoundCornerIcon;
