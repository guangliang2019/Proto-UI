// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grid-3x2' as const;
export const LUCIDE_GRID_3X2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 3v18' }),
  svg.path({ d: 'M3 12h18' }),
  svg.path({ d: 'M9 3v18' }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucideGrid3x2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRID_3X2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grid-3x2-icon',
  prototypeName: 'lucide-grid-3x2-icon',
  shapeFactory: LUCIDE_GRID_3X2_SHAPE_FACTORY,
});

export const asLucideGrid3x2Icon = fixed.asHook;
export const lucideGrid3x2Icon = fixed.prototype;
export default lucideGrid3x2Icon;
