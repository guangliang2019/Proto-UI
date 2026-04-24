// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gallery-thumbnails' as const;
export const LUCIDE_GALLERY_THUMBNAILS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 14, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M4 21h1' }),
  svg.path({ d: 'M9 21h1' }),
  svg.path({ d: 'M14 21h1' }),
  svg.path({ d: 'M19 21h1' }),
];

export function renderLucideGalleryThumbnailsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GALLERY_THUMBNAILS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gallery-thumbnails-icon',
  prototypeName: 'lucide-gallery-thumbnails-icon',
  shapeFactory: LUCIDE_GALLERY_THUMBNAILS_SHAPE_FACTORY,
});

export const asLucideGalleryThumbnailsIcon = fixed.asHook;
export const lucideGalleryThumbnailsIcon = fixed.prototype;
export default lucideGalleryThumbnailsIcon;
