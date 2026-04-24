// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-pinned' as const;
export const LUCIDE_MAP_PINNED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0',
  }),
  svg.circle({ cx: 12, cy: 8, r: 2 }),
  svg.path({
    d: 'M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712',
  }),
];

export function renderLucideMapPinnedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PINNED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-pinned-icon',
  prototypeName: 'lucide-map-pinned-icon',
  shapeFactory: LUCIDE_MAP_PINNED_SHAPE_FACTORY,
});

export const asLucideMapPinnedIcon = fixed.asHook;
export const lucideMapPinnedIcon = fixed.prototype;
export default lucideMapPinnedIcon;
