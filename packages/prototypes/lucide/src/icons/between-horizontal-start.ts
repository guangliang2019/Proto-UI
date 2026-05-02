// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'between-horizontal-start' as const;
export const LUCIDE_BETWEEN_HORIZONTAL_START_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 13, height: 7, x: 8, y: 3, rx: 1 }),
  svg.path({ d: 'm2 9 3 3-3 3' }),
  svg.rect({ width: 13, height: 7, x: 8, y: 14, rx: 1 }),
];

export function renderLucideBetweenHorizontalStartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BETWEEN_HORIZONTAL_START_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-between-horizontal-start-icon',
  prototypeName: 'lucide-between-horizontal-start-icon',
  shapeFactory: LUCIDE_BETWEEN_HORIZONTAL_START_SHAPE_FACTORY,
});

export const asLucideBetweenHorizontalStartIcon = fixed.asHook;
export const lucideBetweenHorizontalStartIcon = fixed.prototype;
export default lucideBetweenHorizontalStartIcon;
