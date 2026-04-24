// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shapes' as const;
export const LUCIDE_SHAPES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z',
  }),
  svg.rect({ x: 3, y: 14, width: 7, height: 7, rx: 1 }),
  svg.circle({ cx: 17.5, cy: 17.5, r: 3.5 }),
];

export function renderLucideShapesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHAPES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shapes-icon',
  prototypeName: 'lucide-shapes-icon',
  shapeFactory: LUCIDE_SHAPES_SHAPE_FACTORY,
});

export const asLucideShapesIcon = fixed.asHook;
export const lucideShapesIcon = fixed.prototype;
export default lucideShapesIcon;
