// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'play' as const;
export const LUCIDE_PLAY_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z',
  });

export function renderLucidePlayIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PLAY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-play-icon',
  prototypeName: 'lucide-play-icon',
  shapeFactory: LUCIDE_PLAY_SHAPE_FACTORY,
});

export const asLucidePlayIcon = fixed.asHook;
export const lucidePlayIcon = fixed.prototype;
export default lucidePlayIcon;
