// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'frame' as const;
export const LUCIDE_FRAME_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 22, x2: 2, y1: 6, y2: 6 }),
  svg.line({ x1: 22, x2: 2, y1: 18, y2: 18 }),
  svg.line({ x1: 6, x2: 6, y1: 2, y2: 22 }),
  svg.line({ x1: 18, x2: 18, y1: 2, y2: 22 }),
];

export function renderLucideFrameIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FRAME_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-frame-icon',
  prototypeName: 'lucide-frame-icon',
  shapeFactory: LUCIDE_FRAME_SHAPE_FACTORY,
});

export const asLucideFrameIcon = fixed.asHook;
export const lucideFrameIcon = fixed.prototype;
export default lucideFrameIcon;
