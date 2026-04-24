// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-end' as const;
export const LUCIDE_LIST_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5H3' }),
  svg.path({ d: 'M16 12H3' }),
  svg.path({ d: 'M9 19H3' }),
  svg.path({ d: 'm16 16-3 3 3 3' }),
  svg.path({ d: 'M21 5v12a2 2 0 0 1-2 2h-6' }),
];

export function renderLucideListEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-end-icon',
  prototypeName: 'lucide-list-end-icon',
  shapeFactory: LUCIDE_LIST_END_SHAPE_FACTORY,
});

export const asLucideListEndIcon = fixed.asHook;
export const lucideListEndIcon = fixed.prototype;
export default lucideListEndIcon;
