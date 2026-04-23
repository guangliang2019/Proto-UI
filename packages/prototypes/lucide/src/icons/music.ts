// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'music' as const;
export const LUCIDE_MUSIC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 18V5l12-2v13' }),
  svg.circle({ cx: 6, cy: 18, r: 3 }),
  svg.circle({ cx: 18, cy: 16, r: 3 }),
];

export function renderLucideMusicIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MUSIC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-music-icon',
  prototypeName: 'lucide-music-icon',
  shapeFactory: LUCIDE_MUSIC_SHAPE_FACTORY,
});

export const asLucideMusicIcon = fixed.asHook;
export const lucideMusicIcon = fixed.prototype;
export default lucideMusicIcon;
