// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'image' as const;
export const LUCIDE_IMAGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.circle({ cx: 9, cy: 9, r: 2 }),
  svg.path({ d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' }),
];

export function renderLucideImageIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMAGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-image-icon',
  prototypeName: 'lucide-image-icon',
  shapeFactory: LUCIDE_IMAGE_SHAPE_FACTORY,
});

export const asLucideImageIcon = fixed.asHook;
export const lucideImageIcon = fixed.prototype;
export default lucideImageIcon;
