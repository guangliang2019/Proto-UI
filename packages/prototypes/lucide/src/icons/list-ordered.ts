// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-ordered' as const;
export const LUCIDE_LIST_ORDERED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 5h10' }),
  svg.path({ d: 'M11 12h10' }),
  svg.path({ d: 'M11 19h10' }),
  svg.path({ d: 'M4 4h1v5' }),
  svg.path({ d: 'M4 9h2' }),
  svg.path({ d: 'M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02' }),
];

export function renderLucideListOrderedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_ORDERED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-ordered-icon',
  prototypeName: 'lucide-list-ordered-icon',
  shapeFactory: LUCIDE_LIST_ORDERED_SHAPE_FACTORY,
});

export const asLucideListOrderedIcon = fixed.asHook;
export const lucideListOrderedIcon = fixed.prototype;
export default lucideListOrderedIcon;
