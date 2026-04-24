// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grid-2x2' as const;
export const LUCIDE_GRID_2X2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v18' }),
  svg.path({ d: 'M3 12h18' }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucideGrid2x2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRID_2X2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grid-2x2-icon',
  prototypeName: 'lucide-grid-2x2-icon',
  shapeFactory: LUCIDE_GRID_2X2_SHAPE_FACTORY,
});

export const asLucideGrid2x2Icon = fixed.asHook;
export const lucideGrid2x2Icon = fixed.prototype;
export default lucideGrid2x2Icon;
