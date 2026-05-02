// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grid-2x2-check' as const;
export const LUCIDE_GRID_2X2_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3',
  }),
  svg.path({ d: 'm16 19 2 2 4-4' }),
];

export function renderLucideGrid2x2CheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRID_2X2_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grid-2x2-check-icon',
  prototypeName: 'lucide-grid-2x2-check-icon',
  shapeFactory: LUCIDE_GRID_2X2_CHECK_SHAPE_FACTORY,
});

export const asLucideGrid2x2CheckIcon = fixed.asHook;
export const lucideGrid2x2CheckIcon = fixed.prototype;
export default lucideGrid2x2CheckIcon;
