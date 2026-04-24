// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-search' as const;
export const LUCIDE_BOOK_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 22H5.5a1 1 0 0 1 0-5h4.501' }),
  svg.path({ d: 'm21 22-1.879-1.878' }),
  svg.path({ d: 'M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8' }),
  svg.circle({ cx: 17, cy: 18, r: 3 }),
];

export function renderLucideBookSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-search-icon',
  prototypeName: 'lucide-book-search-icon',
  shapeFactory: LUCIDE_BOOK_SEARCH_SHAPE_FACTORY,
});

export const asLucideBookSearchIcon = fixed.asHook;
export const lucideBookSearchIcon = fixed.prototype;
export default lucideBookSearchIcon;
