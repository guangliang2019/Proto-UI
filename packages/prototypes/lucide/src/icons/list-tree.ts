// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-tree' as const;
export const LUCIDE_LIST_TREE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 5h13' }),
  svg.path({ d: 'M13 12h8' }),
  svg.path({ d: 'M13 19h8' }),
  svg.path({ d: 'M3 10a2 2 0 0 0 2 2h3' }),
  svg.path({ d: 'M3 5v12a2 2 0 0 0 2 2h3' }),
];

export function renderLucideListTreeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_TREE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-tree-icon',
  prototypeName: 'lucide-list-tree-icon',
  shapeFactory: LUCIDE_LIST_TREE_SHAPE_FACTORY,
});

export const asLucideListTreeIcon = fixed.asHook;
export const lucideListTreeIcon = fixed.prototype;
export default lucideListTreeIcon;
