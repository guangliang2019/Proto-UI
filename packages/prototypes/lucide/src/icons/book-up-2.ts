// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-up-2' as const;
export const LUCIDE_BOOK_UP_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13V7' }),
  svg.path({ d: 'M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' }),
  svg.path({ d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2' }),
  svg.path({ d: 'm9 10 3-3 3 3' }),
  svg.path({ d: 'm9 5 3-3 3 3' }),
];

export function renderLucideBookUp2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_UP_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-up-2-icon',
  prototypeName: 'lucide-book-up-2-icon',
  shapeFactory: LUCIDE_BOOK_UP_2_SHAPE_FACTORY,
});

export const asLucideBookUp2Icon = fixed.asHook;
export const lucideBookUp2Icon = fixed.prototype;
export default lucideBookUp2Icon;
