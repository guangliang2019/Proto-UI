// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'image-minus' as const;
export const LUCIDE_IMAGE_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7' }),
  svg.line({ x1: 16, x2: 22, y1: 5, y2: 5 }),
  svg.circle({ cx: 9, cy: 9, r: 2 }),
  svg.path({ d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' }),
];

export function renderLucideImageMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMAGE_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-image-minus-icon',
  prototypeName: 'lucide-image-minus-icon',
  shapeFactory: LUCIDE_IMAGE_MINUS_SHAPE_FACTORY,
});

export const asLucideImageMinusIcon = fixed.asHook;
export const lucideImageMinusIcon = fixed.prototype;
export default lucideImageMinusIcon;
