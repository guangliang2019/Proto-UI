// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tent-tree' as const;
export const LUCIDE_TENT_TREE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 4, cy: 4, r: 2 }),
  svg.path({ d: 'm14 5 3-3 3 3' }),
  svg.path({ d: 'm14 10 3-3 3 3' }),
  svg.path({ d: 'M17 14V2' }),
  svg.path({ d: 'M17 14H7l-5 8h20Z' }),
  svg.path({ d: 'M8 14v8' }),
  svg.path({ d: 'm9 14 5 8' }),
];

export function renderLucideTentTreeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TENT_TREE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tent-tree-icon',
  prototypeName: 'lucide-tent-tree-icon',
  shapeFactory: LUCIDE_TENT_TREE_SHAPE_FACTORY,
});

export const asLucideTentTreeIcon = fixed.asHook;
export const lucideTentTreeIcon = fixed.prototype;
export default lucideTentTreeIcon;
