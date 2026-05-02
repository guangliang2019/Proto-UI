// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-end-horizontal' as const;
export const LUCIDE_ALIGN_END_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 16, x: 4, y: 2, rx: 2 }),
  svg.rect({ width: 6, height: 9, x: 14, y: 9, rx: 2 }),
  svg.path({ d: 'M22 22H2' }),
];

export function renderLucideAlignEndHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_END_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-end-horizontal-icon',
  prototypeName: 'lucide-align-end-horizontal-icon',
  shapeFactory: LUCIDE_ALIGN_END_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideAlignEndHorizontalIcon = fixed.asHook;
export const lucideAlignEndHorizontalIcon = fixed.prototype;
export default lucideAlignEndHorizontalIcon;
