// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'navigation-2-off' as const;
export const LUCIDE_NAVIGATION_2_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9.31 9.31 5 21l7-4 7 4-1.17-3.17' }),
  svg.path({ d: 'M14.53 8.88 12 2l-1.17 3.17' }),
  svg.line({ x1: 2, x2: 22, y1: 2, y2: 22 }),
];

export function renderLucideNavigation2OffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NAVIGATION_2_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-navigation-2-off-icon',
  prototypeName: 'lucide-navigation-2-off-icon',
  shapeFactory: LUCIDE_NAVIGATION_2_OFF_SHAPE_FACTORY,
});

export const asLucideNavigation2OffIcon = fixed.asHook;
export const lucideNavigation2OffIcon = fixed.prototype;
export default lucideNavigation2OffIcon;
