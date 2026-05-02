// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'navigation-2' as const;
export const LUCIDE_NAVIGATION_2_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.polygon({ points: '12 2 19 21 12 17 5 21 12 2' });

export function renderLucideNavigation2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NAVIGATION_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-navigation-2-icon',
  prototypeName: 'lucide-navigation-2-icon',
  shapeFactory: LUCIDE_NAVIGATION_2_SHAPE_FACTORY,
});

export const asLucideNavigation2Icon = fixed.asHook;
export const lucideNavigation2Icon = fixed.prototype;
export default lucideNavigation2Icon;
