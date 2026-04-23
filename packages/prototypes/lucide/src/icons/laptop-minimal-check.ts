// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'laptop-minimal-check' as const;
export const LUCIDE_LAPTOP_MINIMAL_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 20h20' }),
  svg.path({ d: 'm9 10 2 2 4-4' }),
  svg.rect({ x: 3, y: 4, width: 18, height: 12, rx: 2 }),
];

export function renderLucideLaptopMinimalCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAPTOP_MINIMAL_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-laptop-minimal-check-icon',
  prototypeName: 'lucide-laptop-minimal-check-icon',
  shapeFactory: LUCIDE_LAPTOP_MINIMAL_CHECK_SHAPE_FACTORY,
});

export const asLucideLaptopMinimalCheckIcon = fixed.asHook;
export const lucideLaptopMinimalCheckIcon = fixed.prototype;
export default lucideLaptopMinimalCheckIcon;
