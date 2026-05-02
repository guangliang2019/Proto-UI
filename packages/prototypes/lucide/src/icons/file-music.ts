// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-music' as const;
export const LUCIDE_FILE_MUSIC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M8 20v-7l3 1.474' }),
  svg.circle({ cx: 6, cy: 20, r: 2 }),
];

export function renderLucideFileMusicIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_MUSIC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-music-icon',
  prototypeName: 'lucide-file-music-icon',
  shapeFactory: LUCIDE_FILE_MUSIC_SHAPE_FACTORY,
});

export const asLucideFileMusicIcon = fixed.asHook;
export const lucideFileMusicIcon = fixed.prototype;
export default lucideFileMusicIcon;
