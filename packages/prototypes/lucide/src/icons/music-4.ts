// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'music-4' as const;
export const LUCIDE_MUSIC_4_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 18V5l12-2v13' }),
  svg.path({ d: 'm9 9 12-2' }),
  svg.circle({ cx: 6, cy: 18, r: 3 }),
  svg.circle({ cx: 18, cy: 16, r: 3 }),
];

export function renderLucideMusic4Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MUSIC_4_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-music-4-icon',
  prototypeName: 'lucide-music-4-icon',
  shapeFactory: LUCIDE_MUSIC_4_SHAPE_FACTORY,
});

export const asLucideMusic4Icon = fixed.asHook;
export const lucideMusic4Icon = fixed.prototype;
export default lucideMusic4Icon;
