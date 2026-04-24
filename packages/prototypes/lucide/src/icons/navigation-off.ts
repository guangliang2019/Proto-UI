// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'navigation-off' as const;
export const LUCIDE_NAVIGATION_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8.43 8.43 3 11l8 2 2 8 2.57-5.43' }),
  svg.path({ d: 'M17.39 11.73 22 2l-9.73 4.61' }),
  svg.line({ x1: 2, x2: 22, y1: 2, y2: 22 }),
];

export function renderLucideNavigationOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NAVIGATION_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-navigation-off-icon',
  prototypeName: 'lucide-navigation-off-icon',
  shapeFactory: LUCIDE_NAVIGATION_OFF_SHAPE_FACTORY,
});

export const asLucideNavigationOffIcon = fixed.asHook;
export const lucideNavigationOffIcon = fixed.prototype;
export default lucideNavigationOffIcon;
