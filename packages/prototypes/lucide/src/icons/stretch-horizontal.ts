// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'stretch-horizontal' as const;
export const LUCIDE_STRETCH_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 6, x: 2, y: 4, rx: 2 }),
  svg.rect({ width: 20, height: 6, x: 2, y: 14, rx: 2 }),
];

export function renderLucideStretchHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STRETCH_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-stretch-horizontal-icon',
  prototypeName: 'lucide-stretch-horizontal-icon',
  shapeFactory: LUCIDE_STRETCH_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideStretchHorizontalIcon = fixed.asHook;
export const lucideStretchHorizontalIcon = fixed.prototype;
export default lucideStretchHorizontalIcon;
