// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table-cells-split' as const;
export const LUCIDE_TABLE_CELLS_SPLIT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 15V9' }),
  svg.path({ d: 'M3 15h18' }),
  svg.path({ d: 'M3 9h18' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
];

export function renderLucideTableCellsSplitIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_CELLS_SPLIT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-cells-split-icon',
  prototypeName: 'lucide-table-cells-split-icon',
  shapeFactory: LUCIDE_TABLE_CELLS_SPLIT_SHAPE_FACTORY,
});

export const asLucideTableCellsSplitIcon = fixed.asHook;
export const lucideTableCellsSplitIcon = fixed.prototype;
export default lucideTableCellsSplitIcon;
