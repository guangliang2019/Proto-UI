// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-check-big' as const;
export const LUCIDE_SQUARE_CHECK_BIG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344' }),
  svg.path({ d: 'm9 11 3 3L22 4' }),
];

export function renderLucideSquareCheckBigIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CHECK_BIG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-check-big-icon',
  prototypeName: 'lucide-square-check-big-icon',
  shapeFactory: LUCIDE_SQUARE_CHECK_BIG_SHAPE_FACTORY,
});

export const asLucideSquareCheckBigIcon = fixed.asHook;
export const lucideSquareCheckBigIcon = fixed.prototype;
export default lucideSquareCheckBigIcon;
