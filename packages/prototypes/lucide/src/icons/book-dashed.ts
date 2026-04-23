// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'book-dashed' as const;
export const LUCIDE_BOOK_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17h1.5' }),
  svg.path({ d: 'M12 22h1.5' }),
  svg.path({ d: 'M12 2h1.5' }),
  svg.path({ d: 'M17.5 22H19a1 1 0 0 0 1-1' }),
  svg.path({ d: 'M17.5 2H19a1 1 0 0 1 1 1v1.5' }),
  svg.path({ d: 'M20 14v3h-2.5' }),
  svg.path({ d: 'M20 8.5V10' }),
  svg.path({ d: 'M4 10V8.5' }),
  svg.path({ d: 'M4 19.5V14' }),
  svg.path({ d: 'M4 4.5A2.5 2.5 0 0 1 6.5 2H8' }),
  svg.path({ d: 'M8 22H6.5a1 1 0 0 1 0-5H8' }),
];

export function renderLucideBookDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOK_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-book-dashed-icon',
  prototypeName: 'lucide-book-dashed-icon',
  shapeFactory: LUCIDE_BOOK_DASHED_SHAPE_FACTORY,
});

export const asLucideBookDashedIcon = fixed.asHook;
export const lucideBookDashedIcon = fixed.prototype;
export default lucideBookDashedIcon;
