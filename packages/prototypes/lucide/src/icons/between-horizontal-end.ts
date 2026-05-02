// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'between-horizontal-end' as const;
export const LUCIDE_BETWEEN_HORIZONTAL_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 13, height: 7, x: 3, y: 3, rx: 1 }),
  svg.path({ d: 'm22 15-3-3 3-3' }),
  svg.rect({ width: 13, height: 7, x: 3, y: 14, rx: 1 }),
];

export function renderLucideBetweenHorizontalEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BETWEEN_HORIZONTAL_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-between-horizontal-end-icon',
  prototypeName: 'lucide-between-horizontal-end-icon',
  shapeFactory: LUCIDE_BETWEEN_HORIZONTAL_END_SHAPE_FACTORY,
});

export const asLucideBetweenHorizontalEndIcon = fixed.asHook;
export const lucideBetweenHorizontalEndIcon = fixed.prototype;
export default lucideBetweenHorizontalEndIcon;
