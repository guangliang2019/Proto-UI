// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-split-horizontal' as const;
export const LUCIDE_SQUARE_SPLIT_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3' }),
  svg.path({ d: 'M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3' }),
  svg.line({ x1: 12, x2: 12, y1: 4, y2: 20 }),
];

export function renderLucideSquareSplitHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_SPLIT_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-split-horizontal-icon',
  prototypeName: 'lucide-square-split-horizontal-icon',
  shapeFactory: LUCIDE_SQUARE_SPLIT_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideSquareSplitHorizontalIcon = fixed.asHook;
export const lucideSquareSplitHorizontalIcon = fixed.prototype;
export default lucideSquareSplitHorizontalIcon;
