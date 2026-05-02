// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'images' as const;
export const LUCIDE_IMAGES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16' }),
  svg.path({ d: 'M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2' }),
  svg.circle({ cx: 13, cy: 7, r: 1, fill: 'currentColor' }),
  svg.rect({ x: 8, y: 2, width: 14, height: 14, rx: 2 }),
];

export function renderLucideImagesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMAGES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-images-icon',
  prototypeName: 'lucide-images-icon',
  shapeFactory: LUCIDE_IMAGES_SHAPE_FACTORY,
});

export const asLucideImagesIcon = fixed.asHook;
export const lucideImagesIcon = fixed.prototype;
export default lucideImagesIcon;
