// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-menu' as const;
export const LUCIDE_SQUARE_MENU_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7 8h10' }),
  svg.path({ d: 'M7 12h10' }),
  svg.path({ d: 'M7 16h10' }),
];

export function renderLucideSquareMenuIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_MENU_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-menu-icon',
  prototypeName: 'lucide-square-menu-icon',
  shapeFactory: LUCIDE_SQUARE_MENU_SHAPE_FACTORY,
});

export const asLucideSquareMenuIcon = fixed.asHook;
export const lucideSquareMenuIcon = fixed.prototype;
export default lucideSquareMenuIcon;
