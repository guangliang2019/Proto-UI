// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-network' as const;
export const LUCIDE_CHART_NETWORK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm13.11 7.664 1.78 2.672' }),
  svg.path({ d: 'm14.162 12.788-3.324 1.424' }),
  svg.path({ d: 'm20 4-6.06 1.515' }),
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.circle({ cx: 12, cy: 6, r: 2 }),
  svg.circle({ cx: 16, cy: 12, r: 2 }),
  svg.circle({ cx: 9, cy: 15, r: 2 }),
];

export function renderLucideChartNetworkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_NETWORK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-network-icon',
  prototypeName: 'lucide-chart-network-icon',
  shapeFactory: LUCIDE_CHART_NETWORK_SHAPE_FACTORY,
});

export const asLucideChartNetworkIcon = fixed.asHook;
export const lucideChartNetworkIcon = fixed.prototype;
export default lucideChartNetworkIcon;
