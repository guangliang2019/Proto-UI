// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round-search' as const;
export const LUCIDE_USER_ROUND_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 10, cy: 8, r: 5 }),
  svg.path({ d: 'M2 21a8 8 0 0 1 10.434-7.62' }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
  svg.path({ d: 'm22 22-1.9-1.9' }),
];

export function renderLucideUserRoundSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-search-icon',
  prototypeName: 'lucide-user-round-search-icon',
  shapeFactory: LUCIDE_USER_ROUND_SEARCH_SHAPE_FACTORY,
});

export const asLucideUserRoundSearchIcon = fixed.asHook;
export const lucideUserRoundSearchIcon = fixed.prototype;
export default lucideUserRoundSearchIcon;
