// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-horizontal-justify-end' as const;
export const LUCIDE_ALIGN_HORIZONTAL_JUSTIFY_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 14, x: 2, y: 5, rx: 2 }),
  svg.rect({ width: 6, height: 10, x: 12, y: 7, rx: 2 }),
  svg.path({ d: 'M22 2v20' }),
];

export function renderLucideAlignHorizontalJustifyEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_HORIZONTAL_JUSTIFY_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-horizontal-justify-end-icon',
  prototypeName: 'lucide-align-horizontal-justify-end-icon',
  shapeFactory: LUCIDE_ALIGN_HORIZONTAL_JUSTIFY_END_SHAPE_FACTORY,
});

export const asLucideAlignHorizontalJustifyEndIcon = fixed.asHook;
export const lucideAlignHorizontalJustifyEndIcon = fixed.prototype;
export default lucideAlignHorizontalJustifyEndIcon;
