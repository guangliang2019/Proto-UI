// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rectangle-goggles' as const;
export const LUCIDE_RECTANGLE_GOGGLES_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
  });

export function renderLucideRectangleGogglesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RECTANGLE_GOGGLES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rectangle-goggles-icon',
  prototypeName: 'lucide-rectangle-goggles-icon',
  shapeFactory: LUCIDE_RECTANGLE_GOGGLES_SHAPE_FACTORY,
});

export const asLucideRectangleGogglesIcon = fixed.asHook;
export const lucideRectangleGogglesIcon = fixed.prototype;
export default lucideRectangleGogglesIcon;
