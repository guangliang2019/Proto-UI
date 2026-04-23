// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zoom-in' as const;
export const LUCIDE_ZOOM_IN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11, cy: 11, r: 8 }),
  svg.line({ x1: 21, x2: 16.65, y1: 21, y2: 16.65 }),
  svg.line({ x1: 11, x2: 11, y1: 8, y2: 14 }),
  svg.line({ x1: 8, x2: 14, y1: 11, y2: 11 }),
];

export function renderLucideZoomInIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZOOM_IN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zoom-in-icon',
  prototypeName: 'lucide-zoom-in-icon',
  shapeFactory: LUCIDE_ZOOM_IN_SHAPE_FACTORY,
});

export const asLucideZoomInIcon = fixed.asHook;
export const lucideZoomInIcon = fixed.prototype;
export default lucideZoomInIcon;
