// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grid-2x2-plus' as const;
export const LUCIDE_GRID_2X2_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3',
  }),
  svg.path({ d: 'M16 19h6' }),
  svg.path({ d: 'M19 22v-6' }),
];

export function renderLucideGrid2x2PlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRID_2X2_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grid-2x2-plus-icon',
  prototypeName: 'lucide-grid-2x2-plus-icon',
  shapeFactory: LUCIDE_GRID_2X2_PLUS_SHAPE_FACTORY,
});

export const asLucideGrid2x2PlusIcon = fixed.asHook;
export const lucideGrid2x2PlusIcon = fixed.prototype;
export default lucideGrid2x2PlusIcon;
