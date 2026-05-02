// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-horizontal-distribute-start' as const;
export const LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_START_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 14, x: 4, y: 5, rx: 2 }),
  svg.rect({ width: 6, height: 10, x: 14, y: 7, rx: 2 }),
  svg.path({ d: 'M4 2v20' }),
  svg.path({ d: 'M14 2v20' }),
];

export function renderLucideAlignHorizontalDistributeStartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(
    renderer,
    LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_START_SHAPE_FACTORY,
    options
  );
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-horizontal-distribute-start-icon',
  prototypeName: 'lucide-align-horizontal-distribute-start-icon',
  shapeFactory: LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_START_SHAPE_FACTORY,
});

export const asLucideAlignHorizontalDistributeStartIcon = fixed.asHook;
export const lucideAlignHorizontalDistributeStartIcon = fixed.prototype;
export default lucideAlignHorizontalDistributeStartIcon;
