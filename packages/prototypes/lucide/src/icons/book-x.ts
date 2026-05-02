// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-x' as const;
export const LUCIDE_BOOK_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14.5 7-5 5' }),
  svg.path({
    d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
  }),
  svg.path({ d: 'm9.5 7 5 5' }),
];

export function renderLucideBookXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-x-icon',
  prototypeName: 'lucide-book-x-icon',
  shapeFactory: LUCIDE_BOOK_X_SHAPE_FACTORY,
});

export const asLucideBookXIcon = fixed.asHook;
export const lucideBookXIcon = fixed.prototype;
export default lucideBookXIcon;
