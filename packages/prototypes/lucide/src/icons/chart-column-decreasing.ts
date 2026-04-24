// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-column-decreasing' as const;
export const LUCIDE_CHART_COLUMN_DECREASING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 17V9' }),
  svg.path({ d: 'M18 17v-3' }),
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'M8 17V5' }),
];

export function renderLucideChartColumnDecreasingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_COLUMN_DECREASING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-column-decreasing-icon',
  prototypeName: 'lucide-chart-column-decreasing-icon',
  shapeFactory: LUCIDE_CHART_COLUMN_DECREASING_SHAPE_FACTORY,
});

export const asLucideChartColumnDecreasingIcon = fixed.asHook;
export const lucideChartColumnDecreasingIcon = fixed.prototype;
export default lucideChartColumnDecreasingIcon;
