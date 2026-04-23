// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-bar-increasing' as const;
export const LUCIDE_CHART_BAR_INCREASING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'M7 11h8' }),
  svg.path({ d: 'M7 16h12' }),
  svg.path({ d: 'M7 6h3' }),
];

export function renderLucideChartBarIncreasingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_BAR_INCREASING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-bar-increasing-icon',
  prototypeName: 'lucide-chart-bar-increasing-icon',
  shapeFactory: LUCIDE_CHART_BAR_INCREASING_SHAPE_FACTORY,
});

export const asLucideChartBarIncreasingIcon = fixed.asHook;
export const lucideChartBarIncreasingIcon = fixed.prototype;
export default lucideChartBarIncreasingIcon;
