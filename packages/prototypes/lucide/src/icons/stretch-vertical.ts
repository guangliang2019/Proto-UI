// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'stretch-vertical' as const;
export const LUCIDE_STRETCH_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 20, x: 4, y: 2, rx: 2 }),
  svg.rect({ width: 6, height: 20, x: 14, y: 2, rx: 2 }),
];

export function renderLucideStretchVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STRETCH_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-stretch-vertical-icon',
  prototypeName: 'lucide-stretch-vertical-icon',
  shapeFactory: LUCIDE_STRETCH_VERTICAL_SHAPE_FACTORY,
});

export const asLucideStretchVerticalIcon = fixed.asHook;
export const lucideStretchVerticalIcon = fixed.prototype;
export default lucideStretchVerticalIcon;
