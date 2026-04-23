// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse-pointer-click' as const;
export const LUCIDE_MOUSE_POINTER_CLICK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 4.1 12 6' }),
  svg.path({ d: 'm5.1 8-2.9-.8' }),
  svg.path({ d: 'm6 12-1.9 2' }),
  svg.path({ d: 'M7.2 2.2 8 5.1' }),
  svg.path({
    d: 'M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z',
  }),
];

export function renderLucideMousePointerClickIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_POINTER_CLICK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-pointer-click-icon',
  prototypeName: 'lucide-mouse-pointer-click-icon',
  shapeFactory: LUCIDE_MOUSE_POINTER_CLICK_SHAPE_FACTORY,
});

export const asLucideMousePointerClickIcon = fixed.asHook;
export const lucideMousePointerClickIcon = fixed.prototype;
export default lucideMousePointerClickIcon;
