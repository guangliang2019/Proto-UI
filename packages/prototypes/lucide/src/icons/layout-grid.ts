// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'layout-grid' as const;
export const LUCIDE_LAYOUT_GRID_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 7, height: 7, x: 3, y: 3, rx: 1 }),
  svg.rect({ width: 7, height: 7, x: 14, y: 3, rx: 1 }),
  svg.rect({ width: 7, height: 7, x: 14, y: 14, rx: 1 }),
  svg.rect({ width: 7, height: 7, x: 3, y: 14, rx: 1 }),
];

export function renderLucideLayoutGridIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAYOUT_GRID_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-layout-grid-icon',
  prototypeName: 'lucide-layout-grid-icon',
  shapeFactory: LUCIDE_LAYOUT_GRID_SHAPE_FACTORY,
});

export const asLucideLayoutGridIcon = fixed.asHook;
export const lucideLayoutGridIcon = fixed.prototype;
export default lucideLayoutGridIcon;
