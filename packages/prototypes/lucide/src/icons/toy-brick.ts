// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'toy-brick' as const;
export const LUCIDE_TOY_BRICK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 12, x: 3, y: 8, rx: 1 }),
  svg.path({ d: 'M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3' }),
  svg.path({ d: 'M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3' }),
];

export function renderLucideToyBrickIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOY_BRICK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-toy-brick-icon',
  prototypeName: 'lucide-toy-brick-icon',
  shapeFactory: LUCIDE_TOY_BRICK_SHAPE_FACTORY,
});

export const asLucideToyBrickIcon = fixed.asHook;
export const lucideToyBrickIcon = fixed.prototype;
export default lucideToyBrickIcon;
