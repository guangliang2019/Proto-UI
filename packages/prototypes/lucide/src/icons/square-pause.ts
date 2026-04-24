// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-pause' as const;
export const LUCIDE_SQUARE_PAUSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.line({ x1: 10, x2: 10, y1: 15, y2: 9 }),
  svg.line({ x1: 14, x2: 14, y1: 15, y2: 9 }),
];

export function renderLucideSquarePauseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PAUSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-pause-icon',
  prototypeName: 'lucide-square-pause-icon',
  shapeFactory: LUCIDE_SQUARE_PAUSE_SHAPE_FACTORY,
});

export const asLucideSquarePauseIcon = fixed.asHook;
export const lucideSquarePauseIcon = fixed.prototype;
export default lucideSquarePauseIcon;
