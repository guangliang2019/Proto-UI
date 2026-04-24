// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-no-axes-combined' as const;
export const LUCIDE_CHART_NO_AXES_COMBINED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 16v5' }),
  svg.path({ d: 'M16 14v7' }),
  svg.path({ d: 'M20 10v11' }),
  svg.path({ d: 'm22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15' }),
  svg.path({ d: 'M4 18v3' }),
  svg.path({ d: 'M8 14v7' }),
];

export function renderLucideChartNoAxesCombinedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_NO_AXES_COMBINED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-no-axes-combined-icon',
  prototypeName: 'lucide-chart-no-axes-combined-icon',
  shapeFactory: LUCIDE_CHART_NO_AXES_COMBINED_SHAPE_FACTORY,
});

export const asLucideChartNoAxesCombinedIcon = fixed.asHook;
export const lucideChartNoAxesCombinedIcon = fixed.prototype;
export default lucideChartNoAxesCombinedIcon;
