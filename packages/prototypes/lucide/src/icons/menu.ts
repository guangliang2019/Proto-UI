// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'menu' as const;
export const LUCIDE_MENU_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 5h16' }),
  svg.path({ d: 'M4 12h16' }),
  svg.path({ d: 'M4 19h16' }),
];

export function renderLucideMenuIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MENU_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-menu-icon',
  prototypeName: 'lucide-menu-icon',
  shapeFactory: LUCIDE_MENU_SHAPE_FACTORY,
});

export const asLucideMenuIcon = fixed.asHook;
export const lucideMenuIcon = fixed.prototype;
export default lucideMenuIcon;
