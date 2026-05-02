// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'navigation' as const;
export const LUCIDE_NAVIGATION_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.polygon({ points: '3 11 22 2 13 21 11 13 3 11' });

export function renderLucideNavigationIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NAVIGATION_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-navigation-icon',
  prototypeName: 'lucide-navigation-icon',
  shapeFactory: LUCIDE_NAVIGATION_SHAPE_FACTORY,
});

export const asLucideNavigationIcon = fixed.asHook;
export const lucideNavigationIcon = fixed.prototype;
export default lucideNavigationIcon;
