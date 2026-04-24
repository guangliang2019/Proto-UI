// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chart-candlestick' as const;
export const LUCIDE_CHART_CANDLESTICK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 5v4' }),
  svg.rect({ width: 4, height: 6, x: 7, y: 9, rx: 1 }),
  svg.path({ d: 'M9 15v2' }),
  svg.path({ d: 'M17 3v2' }),
  svg.rect({ width: 4, height: 8, x: 15, y: 5, rx: 1 }),
  svg.path({ d: 'M17 13v3' }),
  svg.path({ d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
];

export function renderLucideChartCandlestickIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHART_CANDLESTICK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chart-candlestick-icon',
  prototypeName: 'lucide-chart-candlestick-icon',
  shapeFactory: LUCIDE_CHART_CANDLESTICK_SHAPE_FACTORY,
});

export const asLucideChartCandlestickIcon = fixed.asHook;
export const lucideChartCandlestickIcon = fixed.prototype;
export default lucideChartCandlestickIcon;
