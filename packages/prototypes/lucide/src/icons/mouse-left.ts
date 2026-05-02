// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse-left' as const;
export const LUCIDE_MOUSE_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7.318V10' }),
  svg.path({ d: 'M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7' }),
  svg.circle({ cx: 7, cy: 4, r: 2 }),
];

export function renderLucideMouseLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-left-icon',
  prototypeName: 'lucide-mouse-left-icon',
  shapeFactory: LUCIDE_MOUSE_LEFT_SHAPE_FACTORY,
});

export const asLucideMouseLeftIcon = fixed.asHook;
export const lucideMouseLeftIcon = fixed.prototype;
export default lucideMouseLeftIcon;
