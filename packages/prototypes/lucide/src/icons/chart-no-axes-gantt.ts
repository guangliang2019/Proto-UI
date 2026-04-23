// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-no-axes-gantt' as const;
export const LUCIDE_CHART_NO_AXES_GANTT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 5h12' }),
  svg.path({ d: 'M4 12h10' }),
  svg.path({ d: 'M12 19h8' }),
];

export function renderLucideChartNoAxesGanttIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_NO_AXES_GANTT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-no-axes-gantt-icon',
  prototypeName: 'lucide-chart-no-axes-gantt-icon',
  shapeFactory: LUCIDE_CHART_NO_AXES_GANTT_SHAPE_FACTORY,
});

export const asLucideChartNoAxesGanttIcon = fixed.asHook;
export const lucideChartNoAxesGanttIcon = fixed.prototype;
export default lucideChartNoAxesGanttIcon;
