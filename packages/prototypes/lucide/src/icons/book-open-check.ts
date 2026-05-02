// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-open-check' as const;
export const LUCIDE_BOOK_OPEN_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 21V7' }),
  svg.path({ d: 'm16 12 2 2 4-4' }),
  svg.path({
    d: 'M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3',
  }),
];

export function renderLucideBookOpenCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_OPEN_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-open-check-icon',
  prototypeName: 'lucide-book-open-check-icon',
  shapeFactory: LUCIDE_BOOK_OPEN_CHECK_SHAPE_FACTORY,
});

export const asLucideBookOpenCheckIcon = fixed.asHook;
export const lucideBookOpenCheckIcon = fixed.prototype;
export default lucideBookOpenCheckIcon;
