// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'album' as const;
export const LUCIDE_ALBUM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.polyline({ points: '11 3 11 11 14 8 17 11 17 3' }),
];

export function renderLucideAlbumIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALBUM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-album-icon',
  prototypeName: 'lucide-album-icon',
  shapeFactory: LUCIDE_ALBUM_SHAPE_FACTORY,
});

export const asLucideAlbumIcon = fixed.asHook;
export const lucideAlbumIcon = fixed.prototype;
export default lucideAlbumIcon;
