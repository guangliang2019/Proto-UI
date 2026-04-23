// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-no-axes-column' as const;
export const LUCIDE_CHART_NO_AXES_COLUMN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 21v-6' }),
  svg.path({ d: 'M12 21V3' }),
  svg.path({ d: 'M19 21V9' }),
];

export function renderLucideChartNoAxesColumnIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_NO_AXES_COLUMN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-no-axes-column-icon',
  prototypeName: 'lucide-chart-no-axes-column-icon',
  shapeFactory: LUCIDE_CHART_NO_AXES_COLUMN_SHAPE_FACTORY,
});

export const asLucideChartNoAxesColumnIcon = fixed.asHook;
export const lucideChartNoAxesColumnIcon = fixed.prototype;
export default lucideChartNoAxesColumnIcon;
