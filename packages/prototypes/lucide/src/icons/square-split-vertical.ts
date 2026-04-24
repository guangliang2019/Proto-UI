// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-split-vertical' as const;
export const LUCIDE_SQUARE_SPLIT_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3' }),
  svg.path({ d: 'M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3' }),
  svg.line({ x1: 4, x2: 20, y1: 12, y2: 12 }),
];

export function renderLucideSquareSplitVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_SPLIT_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-split-vertical-icon',
  prototypeName: 'lucide-square-split-vertical-icon',
  shapeFactory: LUCIDE_SQUARE_SPLIT_VERTICAL_SHAPE_FACTORY,
});

export const asLucideSquareSplitVerticalIcon = fixed.asHook;
export const lucideSquareSplitVerticalIcon = fixed.prototype;
export default lucideSquareSplitVerticalIcon;
