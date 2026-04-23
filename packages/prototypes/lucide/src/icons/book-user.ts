// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-user' as const;
export const LUCIDE_BOOK_USER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 13a3 3 0 1 0-6 0' }),
  svg.path({
    d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
  }),
  svg.circle({ cx: 12, cy: 8, r: 2 }),
];

export function renderLucideBookUserIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_USER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-user-icon',
  prototypeName: 'lucide-book-user-icon',
  shapeFactory: LUCIDE_BOOK_USER_SHAPE_FACTORY,
});

export const asLucideBookUserIcon = fixed.asHook;
export const lucideBookUserIcon = fixed.prototype;
export default lucideBookUserIcon;
