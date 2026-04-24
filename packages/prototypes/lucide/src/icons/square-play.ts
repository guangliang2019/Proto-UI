// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-play' as const;
export const LUCIDE_SQUARE_PLAY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
  svg.path({
    d: 'M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z',
  }),
];

export function renderLucideSquarePlayIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PLAY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-play-icon',
  prototypeName: 'lucide-square-play-icon',
  shapeFactory: LUCIDE_SQUARE_PLAY_SHAPE_FACTORY,
});

export const asLucideSquarePlayIcon = fixed.asHook;
export const lucideSquarePlayIcon = fixed.prototype;
export default lucideSquarePlayIcon;
