// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'database' as const;
export const LUCIDE_DATABASE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.ellipse({ cx: 12, cy: 5, rx: 9, ry: 3 }),
  svg.path({ d: 'M3 5V19A9 3 0 0 0 21 19V5' }),
  svg.path({ d: 'M3 12A9 3 0 0 0 21 12' }),
];

export function renderLucideDatabaseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DATABASE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-database-icon',
  prototypeName: 'lucide-database-icon',
  shapeFactory: LUCIDE_DATABASE_SHAPE_FACTORY,
});

export const asLucideDatabaseIcon = fixed.asHook;
export const lucideDatabaseIcon = fixed.prototype;
export default lucideDatabaseIcon;
