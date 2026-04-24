// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-column-big' as const;
export const LUCIDE_CHART_COLUMN_BIG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
  svg.rect({ x: 15, y: 5, width: 4, height: 12, rx: 1 }),
  svg.rect({ x: 7, y: 8, width: 4, height: 9, rx: 1 }),
];

export function renderLucideChartColumnBigIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_COLUMN_BIG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-column-big-icon',
  prototypeName: 'lucide-chart-column-big-icon',
  shapeFactory: LUCIDE_CHART_COLUMN_BIG_SHAPE_FACTORY,
});

export const asLucideChartColumnBigIcon = fixed.asHook;
export const lucideChartColumnBigIcon = fixed.prototype;
export default lucideChartColumnBigIcon;
