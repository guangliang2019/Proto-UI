// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gallery-vertical-end' as const;
export const LUCIDE_GALLERY_VERTICAL_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 2h10' }),
  svg.path({ d: 'M5 6h14' }),
  svg.rect({ width: 18, height: 12, x: 3, y: 10, rx: 2 }),
];

export function renderLucideGalleryVerticalEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GALLERY_VERTICAL_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gallery-vertical-end-icon',
  prototypeName: 'lucide-gallery-vertical-end-icon',
  shapeFactory: LUCIDE_GALLERY_VERTICAL_END_SHAPE_FACTORY,
});

export const asLucideGalleryVerticalEndIcon = fixed.asHook;
export const lucideGalleryVerticalEndIcon = fixed.prototype;
export default lucideGalleryVerticalEndIcon;
