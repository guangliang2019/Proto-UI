// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tv-minimal-play' as const;
export const LUCIDE_TV_MINIMAL_PLAY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z',
  }),
  svg.path({ d: 'M7 21h10' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 3, rx: 2 }),
];

export function renderLucideTvMinimalPlayIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TV_MINIMAL_PLAY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tv-minimal-play-icon',
  prototypeName: 'lucide-tv-minimal-play-icon',
  shapeFactory: LUCIDE_TV_MINIMAL_PLAY_SHAPE_FACTORY,
});

export const asLucideTvMinimalPlayIcon = fixed.asHook;
export const lucideTvMinimalPlayIcon = fixed.prototype;
export default lucideTvMinimalPlayIcon;
