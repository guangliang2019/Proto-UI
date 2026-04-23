// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'eraser' as const;
export const LUCIDE_ERASER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21',
  }),
  svg.path({ d: 'm5.082 11.09 8.828 8.828' }),
];

export function renderLucideEraserIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ERASER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-eraser-icon',
  prototypeName: 'lucide-eraser-icon',
  shapeFactory: LUCIDE_ERASER_SHAPE_FACTORY,
});

export const asLucideEraserIcon = fixed.asHook;
export const lucideEraserIcon = fixed.prototype;
export default lucideEraserIcon;
