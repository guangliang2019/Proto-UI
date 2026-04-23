// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-x' as const;
export const LUCIDE_BADGE_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.line({ x1: 15, x2: 9, y1: 9, y2: 15 }),
  svg.line({ x1: 9, x2: 15, y1: 9, y2: 15 }),
];

export function renderLucideBadgeXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-x-icon',
  prototypeName: 'lucide-badge-x-icon',
  shapeFactory: LUCIDE_BADGE_X_SHAPE_FACTORY,
});

export const asLucideBadgeXIcon = fixed.asHook;
export const lucideBadgeXIcon = fixed.prototype;
export default lucideBadgeXIcon;
