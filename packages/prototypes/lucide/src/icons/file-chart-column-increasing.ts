// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-chart-column-increasing' as const;
export const LUCIDE_FILE_CHART_COLUMN_INCREASING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M8 18v-2' }),
  svg.path({ d: 'M12 18v-4' }),
  svg.path({ d: 'M16 18v-6' }),
];

export function renderLucideFileChartColumnIncreasingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_CHART_COLUMN_INCREASING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-chart-column-increasing-icon',
  prototypeName: 'lucide-file-chart-column-increasing-icon',
  shapeFactory: LUCIDE_FILE_CHART_COLUMN_INCREASING_SHAPE_FACTORY,
});

export const asLucideFileChartColumnIncreasingIcon = fixed.asHook;
export const lucideFileChartColumnIncreasingIcon = fixed.prototype;
export default lucideFileChartColumnIncreasingIcon;
