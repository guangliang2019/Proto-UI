// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table-rows-split' as const;
export const LUCIDE_TABLE_ROWS_SPLIT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 10h2' }),
  svg.path({ d: 'M15 22v-8' }),
  svg.path({ d: 'M15 2v4' }),
  svg.path({ d: 'M2 10h2' }),
  svg.path({ d: 'M20 10h2' }),
  svg.path({ d: 'M3 19h18' }),
  svg.path({ d: 'M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6' }),
  svg.path({ d: 'M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2' }),
  svg.path({ d: 'M8 10h2' }),
  svg.path({ d: 'M9 22v-8' }),
  svg.path({ d: 'M9 2v4' }),
];

export function renderLucideTableRowsSplitIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_ROWS_SPLIT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-rows-split-icon',
  prototypeName: 'lucide-table-rows-split-icon',
  shapeFactory: LUCIDE_TABLE_ROWS_SPLIT_SHAPE_FACTORY,
});

export const asLucideTableRowsSplitIcon = fixed.asHook;
export const lucideTableRowsSplitIcon = fixed.prototype;
export default lucideTableRowsSplitIcon;
