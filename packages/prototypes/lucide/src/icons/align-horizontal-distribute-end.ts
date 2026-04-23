// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-horizontal-distribute-end' as const;
export const LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 14, x: 4, y: 5, rx: 2 }),
  svg.rect({ width: 6, height: 10, x: 14, y: 7, rx: 2 }),
  svg.path({ d: 'M10 2v20' }),
  svg.path({ d: 'M20 2v20' }),
];

export function renderLucideAlignHorizontalDistributeEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-horizontal-distribute-end-icon',
  prototypeName: 'lucide-align-horizontal-distribute-end-icon',
  shapeFactory: LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_END_SHAPE_FACTORY,
});

export const asLucideAlignHorizontalDistributeEndIcon = fixed.asHook;
export const lucideAlignHorizontalDistributeEndIcon = fixed.prototype;
export default lucideAlignHorizontalDistributeEndIcon;
