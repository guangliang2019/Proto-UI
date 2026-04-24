// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tree-pine' as const;
export const LUCIDE_TREE_PINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z',
  }),
  svg.path({ d: 'M12 22v-3' }),
];

export function renderLucideTreePineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TREE_PINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tree-pine-icon',
  prototypeName: 'lucide-tree-pine-icon',
  shapeFactory: LUCIDE_TREE_PINE_SHAPE_FACTORY,
});

export const asLucideTreePineIcon = fixed.asHook;
export const lucideTreePineIcon = fixed.prototype;
export default lucideTreePineIcon;
