// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'land-plot' as const;
export const LUCIDE_LAND_PLOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12 8 6-3-6-3v10' }),
  svg.path({
    d: 'm8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12',
  }),
  svg.path({ d: 'm6.49 12.85 11.02 6.3' }),
  svg.path({ d: 'M17.51 12.85 6.5 19.15' }),
];

export function renderLucideLandPlotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAND_PLOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-land-plot-icon',
  prototypeName: 'lucide-land-plot-icon',
  shapeFactory: LUCIDE_LAND_PLOT_SHAPE_FACTORY,
});

export const asLucideLandPlotIcon = fixed.asHook;
export const lucideLandPlotIcon = fixed.prototype;
export default lucideLandPlotIcon;
