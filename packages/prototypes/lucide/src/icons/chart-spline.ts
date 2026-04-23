// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-spline' as const;
export const LUCIDE_CHART_SPLINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7' }),
];

export function renderLucideChartSplineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_SPLINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-spline-icon',
  prototypeName: 'lucide-chart-spline-icon',
  shapeFactory: LUCIDE_CHART_SPLINE_SHAPE_FACTORY,
});

export const asLucideChartSplineIcon = fixed.asHook;
export const lucideChartSplineIcon = fixed.prototype;
export default lucideChartSplineIcon;
