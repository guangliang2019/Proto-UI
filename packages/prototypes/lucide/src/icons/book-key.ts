// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-key' as const;
export const LUCIDE_BOOK_KEY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15' }),
  svg.path({ d: 'M17 2v6' }),
  svg.path({ d: 'M17 4h2' }),
  svg.path({ d: 'M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' }),
  svg.circle({ cx: 17, cy: 10, r: 2 }),
];

export function renderLucideBookKeyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_KEY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-key-icon',
  prototypeName: 'lucide-book-key-icon',
  shapeFactory: LUCIDE_BOOK_KEY_SHAPE_FACTORY,
});

export const asLucideBookKeyIcon = fixed.asHook;
export const lucideBookKeyIcon = fixed.prototype;
export default lucideBookKeyIcon;
