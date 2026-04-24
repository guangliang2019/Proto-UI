// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'paint-roller' as const;
export const LUCIDE_PAINT_ROLLER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 16, height: 6, x: 2, y: 2, rx: 2 }),
  svg.path({ d: 'M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2' }),
  svg.rect({ width: 4, height: 6, x: 8, y: 16, rx: 1 }),
];

export function renderLucidePaintRollerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PAINT_ROLLER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-paint-roller-icon',
  prototypeName: 'lucide-paint-roller-icon',
  shapeFactory: LUCIDE_PAINT_ROLLER_SHAPE_FACTORY,
});

export const asLucidePaintRollerIcon = fixed.asHook;
export const lucidePaintRollerIcon = fixed.prototype;
export default lucidePaintRollerIcon;
