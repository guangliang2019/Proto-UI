// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse-pointer-ban' as const;
export const LUCIDE_MOUSE_POINTER_BAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z',
  }),
  svg.circle({ cx: 16, cy: 16, r: 6 }),
  svg.path({ d: 'm11.8 11.8 8.4 8.4' }),
];

export function renderLucideMousePointerBanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_POINTER_BAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-pointer-ban-icon',
  prototypeName: 'lucide-mouse-pointer-ban-icon',
  shapeFactory: LUCIDE_MOUSE_POINTER_BAN_SHAPE_FACTORY,
});

export const asLucideMousePointerBanIcon = fixed.asHook;
export const lucideMousePointerBanIcon = fixed.prototype;
export default lucideMousePointerBanIcon;
