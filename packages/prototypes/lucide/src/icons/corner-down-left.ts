// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-down-left' as const;
export const LUCIDE_CORNER_DOWN_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 4v7a4 4 0 0 1-4 4H4' }),
  svg.path({ d: 'm9 10-5 5 5 5' }),
];

export function renderLucideCornerDownLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_DOWN_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-down-left-icon',
  prototypeName: 'lucide-corner-down-left-icon',
  shapeFactory: LUCIDE_CORNER_DOWN_LEFT_SHAPE_FACTORY,
});

export const asLucideCornerDownLeftIcon = fixed.asHook;
export const lucideCornerDownLeftIcon = fixed.prototype;
export default lucideCornerDownLeftIcon;
