// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-chart-gantt' as const;
export const LUCIDE_SQUARE_CHART_GANTT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M9 8h7' }),
  svg.path({ d: 'M8 12h6' }),
  svg.path({ d: 'M11 16h5' }),
];

export function renderLucideSquareChartGanttIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CHART_GANTT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-chart-gantt-icon',
  prototypeName: 'lucide-square-chart-gantt-icon',
  shapeFactory: LUCIDE_SQUARE_CHART_GANTT_SHAPE_FACTORY,
});

export const asLucideSquareChartGanttIcon = fixed.asHook;
export const lucideSquareChartGanttIcon = fixed.prototype;
export default lucideSquareChartGanttIcon;
