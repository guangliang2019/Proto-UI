// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'layout-dashboard' as const;
export const LUCIDE_LAYOUT_DASHBOARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 7, height: 9, x: 3, y: 3, rx: 1 }),
  svg.rect({ width: 7, height: 5, x: 14, y: 3, rx: 1 }),
  svg.rect({ width: 7, height: 9, x: 14, y: 12, rx: 1 }),
  svg.rect({ width: 7, height: 5, x: 3, y: 16, rx: 1 }),
];

export function renderLucideLayoutDashboardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAYOUT_DASHBOARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-layout-dashboard-icon',
  prototypeName: 'lucide-layout-dashboard-icon',
  shapeFactory: LUCIDE_LAYOUT_DASHBOARD_SHAPE_FACTORY,
});

export const asLucideLayoutDashboardIcon = fixed.asHook;
export const lucideLayoutDashboardIcon = fixed.prototype;
export default lucideLayoutDashboardIcon;
