// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'layout-panel-top' as const;
export const LUCIDE_LAYOUT_PANEL_TOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 7, x: 3, y: 3, rx: 1 }),
  svg.rect({ width: 7, height: 7, x: 3, y: 14, rx: 1 }),
  svg.rect({ width: 7, height: 7, x: 14, y: 14, rx: 1 }),
];

export function renderLucideLayoutPanelTopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAYOUT_PANEL_TOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-layout-panel-top-icon',
  prototypeName: 'lucide-layout-panel-top-icon',
  shapeFactory: LUCIDE_LAYOUT_PANEL_TOP_SHAPE_FACTORY,
});

export const asLucideLayoutPanelTopIcon = fixed.asHook;
export const lucideLayoutPanelTopIcon = fixed.prototype;
export default lucideLayoutPanelTopIcon;
