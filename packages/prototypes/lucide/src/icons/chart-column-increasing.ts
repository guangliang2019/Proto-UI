// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-column-increasing' as const;
export const LUCIDE_CHART_COLUMN_INCREASING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 17V9' }),
  svg.path({ d: 'M18 17V5' }),
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'M8 17v-3' }),
];

export function renderLucideChartColumnIncreasingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_COLUMN_INCREASING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-column-increasing-icon',
  prototypeName: 'lucide-chart-column-increasing-icon',
  shapeFactory: LUCIDE_CHART_COLUMN_INCREASING_SHAPE_FACTORY,
});

export const asLucideChartColumnIncreasingIcon = fixed.asHook;
export const lucideChartColumnIncreasingIcon = fixed.prototype;
export default lucideChartColumnIncreasingIcon;
