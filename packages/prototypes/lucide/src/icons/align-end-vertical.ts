// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-end-vertical' as const;
export const LUCIDE_ALIGN_END_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 16, height: 6, x: 2, y: 4, rx: 2 }),
  svg.rect({ width: 9, height: 6, x: 9, y: 14, rx: 2 }),
  svg.path({ d: 'M22 22V2' }),
];

export function renderLucideAlignEndVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_END_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-end-vertical-icon',
  prototypeName: 'lucide-align-end-vertical-icon',
  shapeFactory: LUCIDE_ALIGN_END_VERTICAL_SHAPE_FACTORY,
});

export const asLucideAlignEndVerticalIcon = fixed.asHook;
export const lucideAlignEndVerticalIcon = fixed.prototype;
export default lucideAlignEndVerticalIcon;
