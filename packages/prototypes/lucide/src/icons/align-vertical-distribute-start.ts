// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-vertical-distribute-start' as const;
export const LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_START_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 6, x: 5, y: 14, rx: 2 }),
  svg.rect({ width: 10, height: 6, x: 7, y: 4, rx: 2 }),
  svg.path({ d: 'M2 14h20' }),
  svg.path({ d: 'M2 4h20' }),
];

export function renderLucideAlignVerticalDistributeStartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_START_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-vertical-distribute-start-icon',
  prototypeName: 'lucide-align-vertical-distribute-start-icon',
  shapeFactory: LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_START_SHAPE_FACTORY,
});

export const asLucideAlignVerticalDistributeStartIcon = fixed.asHook;
export const lucideAlignVerticalDistributeStartIcon = fixed.prototype;
export default lucideAlignVerticalDistributeStartIcon;
