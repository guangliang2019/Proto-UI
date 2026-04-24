// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gallery-horizontal' as const;
export const LUCIDE_GALLERY_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 3v18' }),
  svg.rect({ width: 12, height: 18, x: 6, y: 3, rx: 2 }),
  svg.path({ d: 'M22 3v18' }),
];

export function renderLucideGalleryHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GALLERY_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gallery-horizontal-icon',
  prototypeName: 'lucide-gallery-horizontal-icon',
  shapeFactory: LUCIDE_GALLERY_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideGalleryHorizontalIcon = fixed.asHook;
export const lucideGalleryHorizontalIcon = fixed.prototype;
export default lucideGalleryHorizontalIcon;
