// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'image-off' as const;
export const LUCIDE_IMAGE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 2, x2: 22, y1: 2, y2: 22 }),
  svg.path({ d: 'M10.41 10.41a2 2 0 1 1-2.83-2.83' }),
  svg.line({ x1: 13.5, x2: 6, y1: 13.5, y2: 21 }),
  svg.line({ x1: 18, x2: 21, y1: 12, y2: 15 }),
  svg.path({ d: 'M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59' }),
  svg.path({ d: 'M21 15V5a2 2 0 0 0-2-2H9' }),
];

export function renderLucideImageOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMAGE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-image-off-icon',
  prototypeName: 'lucide-image-off-icon',
  shapeFactory: LUCIDE_IMAGE_OFF_SHAPE_FACTORY,
});

export const asLucideImageOffIcon = fixed.asHook;
export const lucideImageOffIcon = fixed.prototype;
export default lucideImageOffIcon;
