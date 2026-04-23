// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-horizontal-distribute-center' as const;
export const LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_CENTER_SHAPE_FACTORY: LucideShapeFactory = (
  svg
) => [
  svg.rect({ width: 6, height: 14, x: 4, y: 5, rx: 2 }),
  svg.rect({ width: 6, height: 10, x: 14, y: 7, rx: 2 }),
  svg.path({ d: 'M17 22v-5' }),
  svg.path({ d: 'M17 7V2' }),
  svg.path({ d: 'M7 22v-3' }),
  svg.path({ d: 'M7 5V2' }),
];

export function renderLucideAlignHorizontalDistributeCenterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(
    renderer,
    LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_CENTER_SHAPE_FACTORY,
    options
  );
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-horizontal-distribute-center-icon',
  prototypeName: 'lucide-align-horizontal-distribute-center-icon',
  shapeFactory: LUCIDE_ALIGN_HORIZONTAL_DISTRIBUTE_CENTER_SHAPE_FACTORY,
});

export const asLucideAlignHorizontalDistributeCenterIcon = fixed.asHook;
export const lucideAlignHorizontalDistributeCenterIcon = fixed.prototype;
export default lucideAlignHorizontalDistributeCenterIcon;
