// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'between-vertical-start' as const;
export const LUCIDE_BETWEEN_VERTICAL_START_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 7, height: 13, x: 3, y: 8, rx: 1 }),
  svg.path({ d: 'm15 2-3 3-3-3' }),
  svg.rect({ width: 7, height: 13, x: 14, y: 8, rx: 1 }),
];

export function renderLucideBetweenVerticalStartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BETWEEN_VERTICAL_START_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-between-vertical-start-icon',
  prototypeName: 'lucide-between-vertical-start-icon',
  shapeFactory: LUCIDE_BETWEEN_VERTICAL_START_SHAPE_FACTORY,
});

export const asLucideBetweenVerticalStartIcon = fixed.asHook;
export const lucideBetweenVerticalStartIcon = fixed.prototype;
export default lucideBetweenVerticalStartIcon;
