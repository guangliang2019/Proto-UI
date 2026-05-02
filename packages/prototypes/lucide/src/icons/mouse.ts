// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse' as const;
export const LUCIDE_MOUSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 5, y: 2, width: 14, height: 20, rx: 7 }),
  svg.path({ d: 'M12 6v4' }),
];

export function renderLucideMouseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-icon',
  prototypeName: 'lucide-mouse-icon',
  shapeFactory: LUCIDE_MOUSE_SHAPE_FACTORY,
});

export const asLucideMouseIcon = fixed.asHook;
export const lucideMouseIcon = fixed.prototype;
export default lucideMouseIcon;
