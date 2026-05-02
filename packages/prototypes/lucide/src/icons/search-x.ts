// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'search-x' as const;
export const LUCIDE_SEARCH_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm13.5 8.5-5 5' }),
  svg.path({ d: 'm8.5 8.5 5 5' }),
  svg.circle({ cx: 11, cy: 11, r: 8 }),
  svg.path({ d: 'm21 21-4.3-4.3' }),
];

export function renderLucideSearchXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEARCH_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-search-x-icon',
  prototypeName: 'lucide-search-x-icon',
  shapeFactory: LUCIDE_SEARCH_X_SHAPE_FACTORY,
});

export const asLucideSearchXIcon = fixed.asHook;
export const lucideSearchXIcon = fixed.prototype;
export default lucideSearchXIcon;
