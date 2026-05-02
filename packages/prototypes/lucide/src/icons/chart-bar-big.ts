// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-bar-big' as const;
export const LUCIDE_CHART_BAR_BIG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.rect({ x: 7, y: 13, width: 9, height: 4, rx: 1 }),
  svg.rect({ x: 7, y: 5, width: 12, height: 4, rx: 1 }),
];

export function renderLucideChartBarBigIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_BAR_BIG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-bar-big-icon',
  prototypeName: 'lucide-chart-bar-big-icon',
  shapeFactory: LUCIDE_CHART_BAR_BIG_SHAPE_FACTORY,
});

export const asLucideChartBarBigIcon = fixed.asHook;
export const lucideChartBarBigIcon = fixed.prototype;
export default lucideChartBarBigIcon;
