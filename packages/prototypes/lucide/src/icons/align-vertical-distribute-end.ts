// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-vertical-distribute-end' as const;
export const LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 6, x: 5, y: 14, rx: 2 }),
  svg.rect({ width: 10, height: 6, x: 7, y: 4, rx: 2 }),
  svg.path({ d: 'M2 20h20' }),
  svg.path({ d: 'M2 10h20' }),
];

export function renderLucideAlignVerticalDistributeEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-vertical-distribute-end-icon',
  prototypeName: 'lucide-align-vertical-distribute-end-icon',
  shapeFactory: LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_END_SHAPE_FACTORY,
});

export const asLucideAlignVerticalDistributeEndIcon = fixed.asHook;
export const lucideAlignVerticalDistributeEndIcon = fixed.prototype;
export default lucideAlignVerticalDistributeEndIcon;
