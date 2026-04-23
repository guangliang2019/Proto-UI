// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'swatch-book' as const;
export const LUCIDE_SWATCH_BOOK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z' }),
  svg.path({ d: 'M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7' }),
  svg.path({ d: 'M 7 17h.01' }),
  svg.path({
    d: 'm11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8',
  }),
];

export function renderLucideSwatchBookIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SWATCH_BOOK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-swatch-book-icon',
  prototypeName: 'lucide-swatch-book-icon',
  shapeFactory: LUCIDE_SWATCH_BOOK_SHAPE_FACTORY,
});

export const asLucideSwatchBookIcon = fixed.asHook;
export const lucideSwatchBookIcon = fixed.prototype;
export default lucideSwatchBookIcon;
