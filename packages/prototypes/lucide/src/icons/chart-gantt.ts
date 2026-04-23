// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-gantt' as const;
export const LUCIDE_CHART_GANTT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 6h8' }),
  svg.path({ d: 'M12 16h6' }),
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.path({ d: 'M8 11h7' }),
];

export function renderLucideChartGanttIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_GANTT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-gantt-icon',
  prototypeName: 'lucide-chart-gantt-icon',
  shapeFactory: LUCIDE_CHART_GANTT_SHAPE_FACTORY,
});

export const asLucideChartGanttIcon = fixed.asHook;
export const lucideChartGanttIcon = fixed.prototype;
export default lucideChartGanttIcon;
