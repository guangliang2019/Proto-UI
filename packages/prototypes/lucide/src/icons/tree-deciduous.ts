// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tree-deciduous' as const;
export const LUCIDE_TREE_DECIDUOUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z',
  }),
  svg.path({ d: 'M12 19v3' }),
];

export function renderLucideTreeDeciduousIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TREE_DECIDUOUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tree-deciduous-icon',
  prototypeName: 'lucide-tree-deciduous-icon',
  shapeFactory: LUCIDE_TREE_DECIDUOUS_SHAPE_FACTORY,
});

export const asLucideTreeDeciduousIcon = fixed.asHook;
export const lucideTreeDeciduousIcon = fixed.prototype;
export default lucideTreeDeciduousIcon;
