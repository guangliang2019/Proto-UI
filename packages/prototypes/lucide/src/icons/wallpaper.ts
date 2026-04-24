// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wallpaper' as const;
export const LUCIDE_WALLPAPER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M8 21h8' }),
  svg.path({ d: 'm9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15' }),
  svg.circle({ cx: 8, cy: 9, r: 2 }),
  svg.rect({ x: 2, y: 3, width: 20, height: 14, rx: 2 }),
];

export function renderLucideWallpaperIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WALLPAPER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wallpaper-icon',
  prototypeName: 'lucide-wallpaper-icon',
  shapeFactory: LUCIDE_WALLPAPER_SHAPE_FACTORY,
});

export const asLucideWallpaperIcon = fixed.asHook;
export const lucideWallpaperIcon = fixed.prototype;
export default lucideWallpaperIcon;
