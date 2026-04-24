// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-scissors' as const;
export const LUCIDE_SQUARE_SCISSORS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.circle({ cx: 8.5, cy: 8.5, r: 1.5 }),
  svg.line({ x1: 9.56066, y1: 9.56066, x2: 12, y2: 12 }),
  svg.line({ x1: 17, y1: 17, x2: 14.82, y2: 14.82 }),
  svg.circle({ cx: 8.5, cy: 15.5, r: 1.5 }),
  svg.line({ x1: 9.56066, y1: 14.43934, x2: 17, y2: 7 }),
];

export function renderLucideSquareScissorsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_SCISSORS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-scissors-icon',
  prototypeName: 'lucide-square-scissors-icon',
  shapeFactory: LUCIDE_SQUARE_SCISSORS_SHAPE_FACTORY,
});

export const asLucideSquareScissorsIcon = fixed.asHook;
export const lucideSquareScissorsIcon = fixed.prototype;
export default lucideSquareScissorsIcon;
