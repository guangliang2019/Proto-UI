// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-filter-plus' as const;
export const LUCIDE_LIST_FILTER_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 5H2' }),
  svg.path({ d: 'M6 12h12' }),
  svg.path({ d: 'M9 19h6' }),
  svg.path({ d: 'M16 5h6' }),
  svg.path({ d: 'M19 8V2' }),
];

export function renderLucideListFilterPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_FILTER_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-filter-plus-icon',
  prototypeName: 'lucide-list-filter-plus-icon',
  shapeFactory: LUCIDE_LIST_FILTER_PLUS_SHAPE_FACTORY,
});

export const asLucideListFilterPlusIcon = fixed.asHook;
export const lucideListFilterPlusIcon = fixed.prototype;
export default lucideListFilterPlusIcon;
