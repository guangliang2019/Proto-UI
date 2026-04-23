// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-type' as const;
export const LUCIDE_BOOK_TYPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 13h4' }),
  svg.path({ d: 'M12 6v7' }),
  svg.path({ d: 'M16 8V6H8v2' }),
  svg.path({
    d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
  }),
];

export function renderLucideBookTypeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_TYPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-type-icon',
  prototypeName: 'lucide-book-type-icon',
  shapeFactory: LUCIDE_BOOK_TYPE_SHAPE_FACTORY,
});

export const asLucideBookTypeIcon = fixed.asHook;
export const lucideBookTypeIcon = fixed.prototype;
export default lucideBookTypeIcon;
