// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tablet' as const;
export const LUCIDE_TABLET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 16, height: 20, x: 4, y: 2, rx: 2, ry: 2 }),
  svg.line({ x1: 12, x2: 12.01, y1: 18, y2: 18 }),
];

export function renderLucideTabletIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tablet-icon',
  prototypeName: 'lucide-tablet-icon',
  shapeFactory: LUCIDE_TABLET_SHAPE_FACTORY,
});

export const asLucideTabletIcon = fixed.asHook;
export const lucideTabletIcon = fixed.prototype;
export default lucideTabletIcon;
