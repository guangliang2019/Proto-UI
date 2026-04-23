// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rotate-ccw-square' as const;
export const LUCIDE_ROTATE_CCW_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 9V7a2 2 0 0 0-2-2h-6' }),
  svg.path({ d: 'm15 2-3 3 3 3' }),
  svg.path({ d: 'M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2' }),
];

export function renderLucideRotateCcwSquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROTATE_CCW_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rotate-ccw-square-icon',
  prototypeName: 'lucide-rotate-ccw-square-icon',
  shapeFactory: LUCIDE_ROTATE_CCW_SQUARE_SHAPE_FACTORY,
});

export const asLucideRotateCcwSquareIcon = fixed.asHook;
export const lucideRotateCcwSquareIcon = fixed.prototype;
export default lucideRotateCcwSquareIcon;
