// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-left-up' as const;
export const LUCIDE_CORNER_LEFT_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 9 9 4 4 9' }),
  svg.path({ d: 'M20 20h-7a4 4 0 0 1-4-4V4' }),
];

export function renderLucideCornerLeftUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_LEFT_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-left-up-icon',
  prototypeName: 'lucide-corner-left-up-icon',
  shapeFactory: LUCIDE_CORNER_LEFT_UP_SHAPE_FACTORY,
});

export const asLucideCornerLeftUpIcon = fixed.asHook;
export const lucideCornerLeftUpIcon = fixed.prototype;
export default lucideCornerLeftUpIcon;
