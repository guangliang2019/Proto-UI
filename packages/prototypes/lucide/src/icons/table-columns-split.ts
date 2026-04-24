// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table-columns-split' as const;
export const LUCIDE_TABLE_COLUMNS_SPLIT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 14v2' }),
  svg.path({ d: 'M14 20v2' }),
  svg.path({ d: 'M14 2v2' }),
  svg.path({ d: 'M14 8v2' }),
  svg.path({ d: 'M2 15h8' }),
  svg.path({ d: 'M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2' }),
  svg.path({ d: 'M2 9h8' }),
  svg.path({ d: 'M22 15h-4' }),
  svg.path({ d: 'M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2' }),
  svg.path({ d: 'M22 9h-4' }),
  svg.path({ d: 'M5 3v18' }),
];

export function renderLucideTableColumnsSplitIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_COLUMNS_SPLIT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-columns-split-icon',
  prototypeName: 'lucide-table-columns-split-icon',
  shapeFactory: LUCIDE_TABLE_COLUMNS_SPLIT_SHAPE_FACTORY,
});

export const asLucideTableColumnsSplitIcon = fixed.asHook;
export const lucideTableColumnsSplitIcon = fixed.prototype;
export default lucideTableColumnsSplitIcon;
