// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-vertical-justify-center' as const;
export const LUCIDE_ALIGN_VERTICAL_JUSTIFY_CENTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 6, x: 5, y: 16, rx: 2 }),
  svg.rect({ width: 10, height: 6, x: 7, y: 2, rx: 2 }),
  svg.path({ d: 'M2 12h20' }),
];

export function renderLucideAlignVerticalJustifyCenterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_VERTICAL_JUSTIFY_CENTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-vertical-justify-center-icon',
  prototypeName: 'lucide-align-vertical-justify-center-icon',
  shapeFactory: LUCIDE_ALIGN_VERTICAL_JUSTIFY_CENTER_SHAPE_FACTORY,
});

export const asLucideAlignVerticalJustifyCenterIcon = fixed.asHook;
export const lucideAlignVerticalJustifyCenterIcon = fixed.prototype;
export default lucideAlignVerticalJustifyCenterIcon;
