// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-vertical-distribute-center' as const;
export const LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_CENTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 17h-3' }),
  svg.path({ d: 'M22 7h-5' }),
  svg.path({ d: 'M5 17H2' }),
  svg.path({ d: 'M7 7H2' }),
  svg.rect({ x: 5, y: 14, width: 14, height: 6, rx: 2 }),
  svg.rect({ x: 7, y: 4, width: 10, height: 6, rx: 2 }),
];

export function renderLucideAlignVerticalDistributeCenterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(
    renderer,
    LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_CENTER_SHAPE_FACTORY,
    options
  );
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-vertical-distribute-center-icon',
  prototypeName: 'lucide-align-vertical-distribute-center-icon',
  shapeFactory: LUCIDE_ALIGN_VERTICAL_DISTRIBUTE_CENTER_SHAPE_FACTORY,
});

export const asLucideAlignVerticalDistributeCenterIcon = fixed.asHook;
export const lucideAlignVerticalDistributeCenterIcon = fixed.prototype;
export default lucideAlignVerticalDistributeCenterIcon;
