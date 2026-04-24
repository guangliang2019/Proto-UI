// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-lock' as const;
export const LUCIDE_BOOK_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 6V4a2 2 0 1 0-4 0v2' }),
  svg.path({ d: 'M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' }),
  svg.path({ d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10' }),
  svg.rect({ x: 12, y: 6, width: 8, height: 5, rx: 1 }),
];

export function renderLucideBookLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-lock-icon',
  prototypeName: 'lucide-book-lock-icon',
  shapeFactory: LUCIDE_BOOK_LOCK_SHAPE_FACTORY,
});

export const asLucideBookLockIcon = fixed.asHook;
export const lucideBookLockIcon = fixed.prototype;
export default lucideBookLockIcon;
