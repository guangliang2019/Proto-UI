// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'disc-album' as const;
export const LUCIDE_DISC_ALBUM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.circle({ cx: 12, cy: 12, r: 5 }),
  svg.path({ d: 'M12 12h.01' }),
];

export function renderLucideDiscAlbumIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DISC_ALBUM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-disc-album-icon',
  prototypeName: 'lucide-disc-album-icon',
  shapeFactory: LUCIDE_DISC_ALBUM_SHAPE_FACTORY,
});

export const asLucideDiscAlbumIcon = fixed.asHook;
export const lucideDiscAlbumIcon = fixed.prototype;
export default lucideDiscAlbumIcon;
