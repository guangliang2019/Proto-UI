// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'spline-pointer' as const;
export const LUCIDE_SPLINE_POINTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z',
  }),
  svg.path({ d: 'M5 17A12 12 0 0 1 17 5' }),
  svg.circle({ cx: 19, cy: 5, r: 2 }),
  svg.circle({ cx: 5, cy: 19, r: 2 }),
];

export function renderLucideSplinePointerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPLINE_POINTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-spline-pointer-icon',
  prototypeName: 'lucide-spline-pointer-icon',
  shapeFactory: LUCIDE_SPLINE_POINTER_SHAPE_FACTORY,
});

export const asLucideSplinePointerIcon = fixed.asHook;
export const lucideSplinePointerIcon = fixed.prototype;
export default lucideSplinePointerIcon;
