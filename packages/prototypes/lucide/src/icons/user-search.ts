// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-search' as const;
export const LUCIDE_USER_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 10, cy: 7, r: 4 }),
  svg.path({ d: 'M10.3 15H7a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 17, cy: 17, r: 3 }),
  svg.path({ d: 'm21 21-1.9-1.9' }),
];

export function renderLucideUserSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-search-icon',
  prototypeName: 'lucide-user-search-icon',
  shapeFactory: LUCIDE_USER_SEARCH_SHAPE_FACTORY,
});

export const asLucideUserSearchIcon = fixed.asHook;
export const lucideUserSearchIcon = fixed.prototype;
export default lucideUserSearchIcon;
