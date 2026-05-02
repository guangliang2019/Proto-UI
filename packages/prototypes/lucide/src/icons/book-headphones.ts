// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-headphones' as const;
export const LUCIDE_BOOK_HEADPHONES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
  }),
  svg.path({ d: 'M8 12v-2a4 4 0 0 1 8 0v2' }),
  svg.circle({ cx: 15, cy: 12, r: 1 }),
  svg.circle({ cx: 9, cy: 12, r: 1 }),
];

export function renderLucideBookHeadphonesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_HEADPHONES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-headphones-icon',
  prototypeName: 'lucide-book-headphones-icon',
  shapeFactory: LUCIDE_BOOK_HEADPHONES_SHAPE_FACTORY,
});

export const asLucideBookHeadphonesIcon = fixed.asHook;
export const lucideBookHeadphonesIcon = fixed.prototype;
export default lucideBookHeadphonesIcon;
