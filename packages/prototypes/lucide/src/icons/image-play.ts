// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'image-play' as const;
export const LUCIDE_IMAGE_PLAY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z',
  }),
  svg.path({ d: 'M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6' }),
  svg.path({ d: 'm6 21 5-5' }),
  svg.circle({ cx: 9, cy: 9, r: 2 }),
];

export function renderLucideImagePlayIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMAGE_PLAY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-image-play-icon',
  prototypeName: 'lucide-image-play-icon',
  shapeFactory: LUCIDE_IMAGE_PLAY_SHAPE_FACTORY,
});

export const asLucideImagePlayIcon = fixed.asHook;
export const lucideImagePlayIcon = fixed.prototype;
export default lucideImagePlayIcon;
