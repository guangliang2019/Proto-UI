// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'laptop-minimal' as const;
export const LUCIDE_LAPTOP_MINIMAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 12, x: 3, y: 4, rx: 2, ry: 2 }),
  svg.line({ x1: 2, x2: 22, y1: 20, y2: 20 }),
];

export function renderLucideLaptopMinimalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAPTOP_MINIMAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-laptop-minimal-icon',
  prototypeName: 'lucide-laptop-minimal-icon',
  shapeFactory: LUCIDE_LAPTOP_MINIMAL_SHAPE_FACTORY,
});

export const asLucideLaptopMinimalIcon = fixed.asHook;
export const lucideLaptopMinimalIcon = fixed.prototype;
export default lucideLaptopMinimalIcon;
