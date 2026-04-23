// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-image' as const;
export const LUCIDE_BOOK_IMAGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17' }),
  svg.path({
    d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
  }),
  svg.circle({ cx: 10, cy: 8, r: 2 }),
];

export function renderLucideBookImageIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_IMAGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-image-icon',
  prototypeName: 'lucide-book-image-icon',
  shapeFactory: LUCIDE_BOOK_IMAGE_SHAPE_FACTORY,
});

export const asLucideBookImageIcon = fixed.asHook;
export const lucideBookImageIcon = fixed.prototype;
export default lucideBookImageIcon;
