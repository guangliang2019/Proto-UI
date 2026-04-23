// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-library' as const;
export const LUCIDE_SQUARE_LIBRARY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7 7v10' }),
  svg.path({ d: 'M11 7v10' }),
  svg.path({ d: 'm15 7 2 10' }),
];

export function renderLucideSquareLibraryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_LIBRARY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-library-icon',
  prototypeName: 'lucide-square-library-icon',
  shapeFactory: LUCIDE_SQUARE_LIBRARY_SHAPE_FACTORY,
});

export const asLucideSquareLibraryIcon = fixed.asHook;
export const lucideSquareLibraryIcon = fixed.prototype;
export default lucideSquareLibraryIcon;
