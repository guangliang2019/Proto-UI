// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-info' as const;
export const LUCIDE_BADGE_INFO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.line({ x1: 12, x2: 12, y1: 16, y2: 12 }),
  svg.line({ x1: 12, x2: 12.01, y1: 8, y2: 8 }),
];

export function renderLucideBadgeInfoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_INFO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-info-icon',
  prototypeName: 'lucide-badge-info-icon',
  shapeFactory: LUCIDE_BADGE_INFO_SHAPE_FACTORY,
});

export const asLucideBadgeInfoIcon = fixed.asHook;
export const lucideBadgeInfoIcon = fixed.prototype;
export default lucideBadgeInfoIcon;
