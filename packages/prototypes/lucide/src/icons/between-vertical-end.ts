// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'between-vertical-end' as const;
export const LUCIDE_BETWEEN_VERTICAL_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 7, height: 13, x: 3, y: 3, rx: 1 }),
  svg.path({ d: 'm9 22 3-3 3 3' }),
  svg.rect({ width: 7, height: 13, x: 14, y: 3, rx: 1 }),
];

export function renderLucideBetweenVerticalEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BETWEEN_VERTICAL_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-between-vertical-end-icon',
  prototypeName: 'lucide-between-vertical-end-icon',
  shapeFactory: LUCIDE_BETWEEN_VERTICAL_END_SHAPE_FACTORY,
});

export const asLucideBetweenVerticalEndIcon = fixed.asHook;
export const lucideBetweenVerticalEndIcon = fixed.prototype;
export default lucideBetweenVerticalEndIcon;
