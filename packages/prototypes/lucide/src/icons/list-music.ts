// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-music' as const;
export const LUCIDE_LIST_MUSIC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5H3' }),
  svg.path({ d: 'M11 12H3' }),
  svg.path({ d: 'M11 19H3' }),
  svg.path({ d: 'M21 16V5' }),
  svg.circle({ cx: 18, cy: 16, r: 3 }),
];

export function renderLucideListMusicIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_MUSIC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-music-icon',
  prototypeName: 'lucide-list-music-icon',
  shapeFactory: LUCIDE_LIST_MUSIC_SHAPE_FACTORY,
});

export const asLucideListMusicIcon = fixed.asHook;
export const lucideListMusicIcon = fixed.prototype;
export default lucideListMusicIcon;
