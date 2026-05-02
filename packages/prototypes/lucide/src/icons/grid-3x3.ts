// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grid-3x3' as const;
export const LUCIDE_GRID_3X3_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 9h18' }),
  svg.path({ d: 'M3 15h18' }),
  svg.path({ d: 'M9 3v18' }),
  svg.path({ d: 'M15 3v18' }),
];

export function renderLucideGrid3x3Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRID_3X3_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grid-3x3-icon',
  prototypeName: 'lucide-grid-3x3-icon',
  shapeFactory: LUCIDE_GRID_3X3_SHAPE_FACTORY,
});

export const asLucideGrid3x3Icon = fixed.asHook;
export const lucideGrid3x3Icon = fixed.prototype;
export default lucideGrid3x3Icon;
