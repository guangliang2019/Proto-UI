// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-open-text' as const;
export const LUCIDE_BOOK_OPEN_TEXT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7v14' }),
  svg.path({ d: 'M16 12h2' }),
  svg.path({ d: 'M16 8h2' }),
  svg.path({
    d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
  }),
  svg.path({ d: 'M6 12h2' }),
  svg.path({ d: 'M6 8h2' }),
];

export function renderLucideBookOpenTextIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_OPEN_TEXT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-open-text-icon',
  prototypeName: 'lucide-book-open-text-icon',
  shapeFactory: LUCIDE_BOOK_OPEN_TEXT_SHAPE_FACTORY,
});

export const asLucideBookOpenTextIcon = fixed.asHook;
export const lucideBookOpenTextIcon = fixed.prototype;
export default lucideBookOpenTextIcon;
