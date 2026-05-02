// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-bar' as const;
export const LUCIDE_CHART_BAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'M7 16h8' }),
  svg.path({ d: 'M7 11h12' }),
  svg.path({ d: 'M7 6h3' }),
];

export function renderLucideChartBarIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_BAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-bar-icon',
  prototypeName: 'lucide-chart-bar-icon',
  shapeFactory: LUCIDE_CHART_BAR_SHAPE_FACTORY,
});

export const asLucideChartBarIcon = fixed.asHook;
export const lucideChartBarIcon = fixed.prototype;
export default lucideChartBarIcon;
