// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'music-3' as const;
export const LUCIDE_MUSIC_3_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 18, r: 4 }),
  svg.path({ d: 'M16 18V2' }),
];

export function renderLucideMusic3Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MUSIC_3_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-music-3-icon',
  prototypeName: 'lucide-music-3-icon',
  shapeFactory: LUCIDE_MUSIC_3_SHAPE_FACTORY,
});

export const asLucideMusic3Icon = fixed.asHook;
export const lucideMusic3Icon = fixed.prototype;
export default lucideMusic3Icon;
