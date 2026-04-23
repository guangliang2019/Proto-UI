// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-bar-decreasing' as const;
export const LUCIDE_CHART_BAR_DECREASING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'M7 11h8' }),
  svg.path({ d: 'M7 16h3' }),
  svg.path({ d: 'M7 6h12' }),
];

export function renderLucideChartBarDecreasingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_BAR_DECREASING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-bar-decreasing-icon',
  prototypeName: 'lucide-chart-bar-decreasing-icon',
  shapeFactory: LUCIDE_CHART_BAR_DECREASING_SHAPE_FACTORY,
});

export const asLucideChartBarDecreasingIcon = fixed.asHook;
export const lucideChartBarDecreasingIcon = fixed.prototype;
export default lucideChartBarDecreasingIcon;
