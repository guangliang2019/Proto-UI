// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-mouse-pointer' as const;
export const LUCIDE_SQUARE_MOUSE_POINTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z',
  }),
  svg.path({ d: 'M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6' }),
];

export function renderLucideSquareMousePointerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_MOUSE_POINTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-mouse-pointer-icon',
  prototypeName: 'lucide-square-mouse-pointer-icon',
  shapeFactory: LUCIDE_SQUARE_MOUSE_POINTER_SHAPE_FACTORY,
});

export const asLucideSquareMousePointerIcon = fixed.asHook;
export const lucideSquareMousePointerIcon = fixed.prototype;
export default lucideSquareMousePointerIcon;
