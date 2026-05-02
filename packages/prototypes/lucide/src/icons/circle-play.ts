// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-play' as const;
export const LUCIDE_CIRCLE_PLAY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z',
  }),
  svg.circle({ cx: 12, cy: 12, r: 10 }),
];

export function renderLucideCirclePlayIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_PLAY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-play-icon',
  prototypeName: 'lucide-circle-play-icon',
  shapeFactory: LUCIDE_CIRCLE_PLAY_SHAPE_FACTORY,
});

export const asLucideCirclePlayIcon = fixed.asHook;
export const lucideCirclePlayIcon = fixed.prototype;
export default lucideCirclePlayIcon;
