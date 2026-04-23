// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-pie' as const;
export const LUCIDE_CHART_PIE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z',
  }),
  svg.path({ d: 'M21.21 15.89A10 10 0 1 1 8 2.83' }),
];

export function renderLucideChartPieIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_PIE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-pie-icon',
  prototypeName: 'lucide-chart-pie-icon',
  shapeFactory: LUCIDE_CHART_PIE_SHAPE_FACTORY,
});

export const asLucideChartPieIcon = fixed.asHook;
export const lucideChartPieIcon = fixed.prototype;
export default lucideChartPieIcon;
