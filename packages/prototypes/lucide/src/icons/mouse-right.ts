// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse-right' as const;
export const LUCIDE_MOUSE_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7.318V10' }),
  svg.path({ d: 'M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7' }),
  svg.circle({ cx: 17, cy: 4, r: 2 }),
];

export function renderLucideMouseRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-right-icon',
  prototypeName: 'lucide-mouse-right-icon',
  shapeFactory: LUCIDE_MOUSE_RIGHT_SHAPE_FACTORY,
});

export const asLucideMouseRightIcon = fixed.asHook;
export const lucideMouseRightIcon = fixed.prototype;
export default lucideMouseRightIcon;
