// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gallery-horizontal-end' as const;
export const LUCIDE_GALLERY_HORIZONTAL_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 7v10' }),
  svg.path({ d: 'M6 5v14' }),
  svg.rect({ width: 12, height: 18, x: 10, y: 3, rx: 2 }),
];

export function renderLucideGalleryHorizontalEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GALLERY_HORIZONTAL_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gallery-horizontal-end-icon',
  prototypeName: 'lucide-gallery-horizontal-end-icon',
  shapeFactory: LUCIDE_GALLERY_HORIZONTAL_END_SHAPE_FACTORY,
});

export const asLucideGalleryHorizontalEndIcon = fixed.asHook;
export const lucideGalleryHorizontalEndIcon = fixed.prototype;
export default lucideGalleryHorizontalEndIcon;
