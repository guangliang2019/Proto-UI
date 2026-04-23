// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-search' as const;
export const LUCIDE_TEXT_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 5H3' }),
  svg.path({ d: 'M10 12H3' }),
  svg.path({ d: 'M10 19H3' }),
  svg.circle({ cx: 17, cy: 15, r: 3 }),
  svg.path({ d: 'm21 19-1.9-1.9' }),
];

export function renderLucideTextSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-search-icon',
  prototypeName: 'lucide-text-search-icon',
  shapeFactory: LUCIDE_TEXT_SEARCH_SHAPE_FACTORY,
});

export const asLucideTextSearchIcon = fixed.asHook;
export const lucideTextSearchIcon = fixed.prototype;
export default lucideTextSearchIcon;
