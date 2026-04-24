// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table-cells-merge' as const;
export const LUCIDE_TABLE_CELLS_MERGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 21v-6' }),
  svg.path({ d: 'M12 9V3' }),
  svg.path({ d: 'M3 15h18' }),
  svg.path({ d: 'M3 9h18' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
];

export function renderLucideTableCellsMergeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_CELLS_MERGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-cells-merge-icon',
  prototypeName: 'lucide-table-cells-merge-icon',
  shapeFactory: LUCIDE_TABLE_CELLS_MERGE_SHAPE_FACTORY,
});

export const asLucideTableCellsMergeIcon = fixed.asHook;
export const lucideTableCellsMergeIcon = fixed.prototype;
export default lucideTableCellsMergeIcon;
