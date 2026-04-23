// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-chart-pie' as const;
export const LUCIDE_FILE_CHART_PIE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M4.017 11.512a6 6 0 1 0 8.466 8.475' }),
  svg.path({
    d: 'M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z',
  }),
];

export function renderLucideFileChartPieIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_CHART_PIE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-chart-pie-icon',
  prototypeName: 'lucide-file-chart-pie-icon',
  shapeFactory: LUCIDE_FILE_CHART_PIE_SHAPE_FACTORY,
});

export const asLucideFileChartPieIcon = fixed.asHook;
export const lucideFileChartPieIcon = fixed.prototype;
export default lucideFileChartPieIcon;
