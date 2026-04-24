// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zoom-out' as const;
export const LUCIDE_ZOOM_OUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11, cy: 11, r: 8 }),
  svg.line({ x1: 21, x2: 16.65, y1: 21, y2: 16.65 }),
  svg.line({ x1: 8, x2: 14, y1: 11, y2: 11 }),
];

export function renderLucideZoomOutIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZOOM_OUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zoom-out-icon',
  prototypeName: 'lucide-zoom-out-icon',
  shapeFactory: LUCIDE_ZOOM_OUT_SHAPE_FACTORY,
});

export const asLucideZoomOutIcon = fixed.asHook;
export const lucideZoomOutIcon = fixed.prototype;
export default lucideZoomOutIcon;
