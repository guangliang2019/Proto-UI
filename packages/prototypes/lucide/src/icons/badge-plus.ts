// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-plus' as const;
export const LUCIDE_BADGE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.line({ x1: 12, x2: 12, y1: 8, y2: 16 }),
  svg.line({ x1: 8, x2: 16, y1: 12, y2: 12 }),
];

export function renderLucideBadgePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-plus-icon',
  prototypeName: 'lucide-badge-plus-icon',
  shapeFactory: LUCIDE_BADGE_PLUS_SHAPE_FACTORY,
});

export const asLucideBadgePlusIcon = fixed.asHook;
export const lucideBadgePlusIcon = fixed.prototype;
export default lucideBadgePlusIcon;
