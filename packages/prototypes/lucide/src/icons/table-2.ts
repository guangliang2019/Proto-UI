// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table-2' as const;
export const LUCIDE_TABLE_2_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18',
  });

export function renderLucideTable2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-2-icon',
  prototypeName: 'lucide-table-2-icon',
  shapeFactory: LUCIDE_TABLE_2_SHAPE_FACTORY,
});

export const asLucideTable2Icon = fixed.asHook;
export const lucideTable2Icon = fixed.prototype;
export default lucideTable2Icon;
