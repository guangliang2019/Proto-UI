// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'music-2' as const;
export const LUCIDE_MUSIC_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 8, cy: 18, r: 4 }),
  svg.path({ d: 'M12 18V2l7 4' }),
];

export function renderLucideMusic2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MUSIC_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-music-2-icon',
  prototypeName: 'lucide-music-2-icon',
  shapeFactory: LUCIDE_MUSIC_2_SHAPE_FACTORY,
});

export const asLucideMusic2Icon = fixed.asHook;
export const lucideMusic2Icon = fixed.prototype;
export default lucideMusic2Icon;
