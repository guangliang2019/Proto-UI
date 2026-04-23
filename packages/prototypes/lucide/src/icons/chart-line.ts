// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-line' as const;
export const LUCIDE_CHART_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'm19 9-5 5-4-4-3 3' }),
];

export function renderLucideChartLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-line-icon',
  prototypeName: 'lucide-chart-line-icon',
  shapeFactory: LUCIDE_CHART_LINE_SHAPE_FACTORY,
});

export const asLucideChartLineIcon = fixed.asHook;
export const lucideChartLineIcon = fixed.prototype;
export default lucideChartLineIcon;
