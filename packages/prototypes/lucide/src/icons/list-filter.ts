// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-filter' as const;
export const LUCIDE_LIST_FILTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 5h20' }),
  svg.path({ d: 'M6 12h12' }),
  svg.path({ d: 'M9 19h6' }),
];

export function renderLucideListFilterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_FILTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-filter-icon',
  prototypeName: 'lucide-list-filter-icon',
  shapeFactory: LUCIDE_LIST_FILTER_SHAPE_FACTORY,
});

export const asLucideListFilterIcon = fixed.asHook;
export const lucideListFilterIcon = fixed.prototype;
export default lucideListFilterIcon;
