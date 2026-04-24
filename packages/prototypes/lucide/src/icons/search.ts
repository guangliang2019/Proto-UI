// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'search' as const;
export const LUCIDE_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm21 21-4.34-4.34' }),
  svg.circle({ cx: 11, cy: 11, r: 8 }),
];

export function renderLucideSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-search-icon',
  prototypeName: 'lucide-search-icon',
  shapeFactory: LUCIDE_SEARCH_SHAPE_FACTORY,
});

export const asLucideSearchIcon = fixed.asHook;
export const lucideSearchIcon = fixed.prototype;
export default lucideSearchIcon;
