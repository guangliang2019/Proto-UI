// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'vector-square' as const;
export const LUCIDE_VECTOR_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19.5 7a24 24 0 0 1 0 10' }),
  svg.path({ d: 'M4.5 7a24 24 0 0 0 0 10' }),
  svg.path({ d: 'M7 19.5a24 24 0 0 0 10 0' }),
  svg.path({ d: 'M7 4.5a24 24 0 0 1 10 0' }),
  svg.rect({ x: 17, y: 17, width: 5, height: 5, rx: 1 }),
  svg.rect({ x: 17, y: 2, width: 5, height: 5, rx: 1 }),
  svg.rect({ x: 2, y: 17, width: 5, height: 5, rx: 1 }),
  svg.rect({ x: 2, y: 2, width: 5, height: 5, rx: 1 }),
];

export function renderLucideVectorSquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VECTOR_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-vector-square-icon',
  prototypeName: 'lucide-vector-square-icon',
  shapeFactory: LUCIDE_VECTOR_SQUARE_SHAPE_FACTORY,
});

export const asLucideVectorSquareIcon = fixed.asHook;
export const lucideVectorSquareIcon = fixed.prototype;
export default lucideVectorSquareIcon;
