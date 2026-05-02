// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-no-axes-column-decreasing' as const;
export const LUCIDE_CHART_NO_AXES_COLUMN_DECREASING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 21V3' }),
  svg.path({ d: 'M12 21V9' }),
  svg.path({ d: 'M19 21v-6' }),
];

export function renderLucideChartNoAxesColumnDecreasingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_NO_AXES_COLUMN_DECREASING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-no-axes-column-decreasing-icon',
  prototypeName: 'lucide-chart-no-axes-column-decreasing-icon',
  shapeFactory: LUCIDE_CHART_NO_AXES_COLUMN_DECREASING_SHAPE_FACTORY,
});

export const asLucideChartNoAxesColumnDecreasingIcon = fixed.asHook;
export const lucideChartNoAxesColumnDecreasingIcon = fixed.prototype;
export default lucideChartNoAxesColumnDecreasingIcon;
