// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-scatter' as const;
export const LUCIDE_CHART_SCATTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 7.5, cy: 7.5, r: '.5', fill: 'currentColor' }),
  svg.circle({ cx: 18.5, cy: 5.5, r: '.5', fill: 'currentColor' }),
  svg.circle({ cx: 11.5, cy: 11.5, r: '.5', fill: 'currentColor' }),
  svg.circle({ cx: 7.5, cy: 16.5, r: '.5', fill: 'currentColor' }),
  svg.circle({ cx: 17.5, cy: 14.5, r: '.5', fill: 'currentColor' }),
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
];

export function renderLucideChartScatterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_SCATTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-scatter-icon',
  prototypeName: 'lucide-chart-scatter-icon',
  shapeFactory: LUCIDE_CHART_SCATTER_SHAPE_FACTORY,
});

export const asLucideChartScatterIcon = fixed.asHook;
export const lucideChartScatterIcon = fixed.prototype;
export default lucideChartScatterIcon;
