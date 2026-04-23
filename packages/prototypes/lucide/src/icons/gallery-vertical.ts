// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gallery-vertical' as const;
export const LUCIDE_GALLERY_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 2h18' }),
  svg.rect({ width: 18, height: 12, x: 3, y: 6, rx: 2 }),
  svg.path({ d: 'M3 22h18' }),
];

export function renderLucideGalleryVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GALLERY_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gallery-vertical-icon',
  prototypeName: 'lucide-gallery-vertical-icon',
  shapeFactory: LUCIDE_GALLERY_VERTICAL_SHAPE_FACTORY,
});

export const asLucideGalleryVerticalIcon = fixed.asHook;
export const lucideGalleryVerticalIcon = fixed.prototype;
export default lucideGalleryVerticalIcon;
