// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'search-check' as const;
export const LUCIDE_SEARCH_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm8 11 2 2 4-4' }),
  svg.circle({ cx: 11, cy: 11, r: 8 }),
  svg.path({ d: 'm21 21-4.3-4.3' }),
];

export function renderLucideSearchCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEARCH_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-search-check-icon',
  prototypeName: 'lucide-search-check-icon',
  shapeFactory: LUCIDE_SEARCH_CHECK_SHAPE_FACTORY,
});

export const asLucideSearchCheckIcon = fixed.asHook;
export const lucideSearchCheckIcon = fixed.prototype;
export default lucideSearchCheckIcon;
