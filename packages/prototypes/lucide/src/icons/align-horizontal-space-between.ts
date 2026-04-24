// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-horizontal-space-between' as const;
export const LUCIDE_ALIGN_HORIZONTAL_SPACE_BETWEEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 14, x: 3, y: 5, rx: 2 }),
  svg.rect({ width: 6, height: 10, x: 15, y: 7, rx: 2 }),
  svg.path({ d: 'M3 2v20' }),
  svg.path({ d: 'M21 2v20' }),
];

export function renderLucideAlignHorizontalSpaceBetweenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_HORIZONTAL_SPACE_BETWEEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-horizontal-space-between-icon',
  prototypeName: 'lucide-align-horizontal-space-between-icon',
  shapeFactory: LUCIDE_ALIGN_HORIZONTAL_SPACE_BETWEEN_SHAPE_FACTORY,
});

export const asLucideAlignHorizontalSpaceBetweenIcon = fixed.asHook;
export const lucideAlignHorizontalSpaceBetweenIcon = fixed.prototype;
export default lucideAlignHorizontalSpaceBetweenIcon;
