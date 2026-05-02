// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-collapse' as const;
export const LUCIDE_LIST_COLLAPSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 5h11' }),
  svg.path({ d: 'M10 12h11' }),
  svg.path({ d: 'M10 19h11' }),
  svg.path({ d: 'm3 10 3-3-3-3' }),
  svg.path({ d: 'm3 20 3-3-3-3' }),
];

export function renderLucideListCollapseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_COLLAPSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-collapse-icon',
  prototypeName: 'lucide-list-collapse-icon',
  shapeFactory: LUCIDE_LIST_COLLAPSE_SHAPE_FACTORY,
});

export const asLucideListCollapseIcon = fixed.asHook;
export const lucideListCollapseIcon = fixed.prototype;
export default lucideListCollapseIcon;
