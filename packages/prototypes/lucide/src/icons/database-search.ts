// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'database-search' as const;
export const LUCIDE_DATABASE_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 11.693V5' }),
  svg.path({ d: 'm22 22-1.875-1.875' }),
  svg.path({ d: 'M3 12a9 3 0 0 0 8.697 2.998' }),
  svg.path({ d: 'M3 5v14a9 3 0 0 0 9.28 2.999' }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
  svg.ellipse({ cx: 12, cy: 5, rx: 9, ry: 3 }),
];

export function renderLucideDatabaseSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DATABASE_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-database-search-icon',
  prototypeName: 'lucide-database-search-icon',
  shapeFactory: LUCIDE_DATABASE_SEARCH_SHAPE_FACTORY,
});

export const asLucideDatabaseSearchIcon = fixed.asHook;
export const lucideDatabaseSearchIcon = fixed.prototype;
export default lucideDatabaseSearchIcon;
