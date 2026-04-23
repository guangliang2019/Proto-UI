// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-bottom-dashed-scissors' as const;
export const LUCIDE_SQUARE_BOTTOM_DASHED_SCISSORS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 5, y1: 3, x2: 19, y2: 3 }),
  svg.line({ x1: 3, y1: 5, x2: 3, y2: 19 }),
  svg.line({ x1: 21, y1: 5, x2: 21, y2: 19 }),
  svg.line({ x1: 9, y1: 21, x2: 10, y2: 21 }),
  svg.line({ x1: 14, y1: 21, x2: 15, y2: 21 }),
  svg.path({ d: 'M 3 5 A2 2 0 0 1 5 3' }),
  svg.path({ d: 'M 19 3 A2 2 0 0 1 21 5' }),
  svg.path({ d: 'M 5 21 A2 2 0 0 1 3 19' }),
  svg.path({ d: 'M 21 19 A2 2 0 0 1 19 21' }),
  svg.circle({ cx: 8.5, cy: 8.5, r: 1.5 }),
  svg.line({ x1: 9.56066, y1: 9.56066, x2: 12, y2: 12 }),
  svg.line({ x1: 17, y1: 17, x2: 14.82, y2: 14.82 }),
  svg.circle({ cx: 8.5, cy: 15.5, r: 1.5 }),
  svg.line({ x1: 9.56066, y1: 14.43934, x2: 17, y2: 7 }),
];

export function renderLucideSquareBottomDashedScissorsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_BOTTOM_DASHED_SCISSORS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-bottom-dashed-scissors-icon',
  prototypeName: 'lucide-square-bottom-dashed-scissors-icon',
  shapeFactory: LUCIDE_SQUARE_BOTTOM_DASHED_SCISSORS_SHAPE_FACTORY,
});

export const asLucideSquareBottomDashedScissorsIcon = fixed.asHook;
export const lucideSquareBottomDashedScissorsIcon = fixed.prototype;
export default lucideSquareBottomDashedScissorsIcon;
