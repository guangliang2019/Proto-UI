// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-align-center' as const;
export const LUCIDE_TEXT_ALIGN_CENTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 5H3' }),
  svg.path({ d: 'M17 12H7' }),
  svg.path({ d: 'M19 19H5' }),
];

export function renderLucideTextAlignCenterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_ALIGN_CENTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-align-center-icon',
  prototypeName: 'lucide-text-align-center-icon',
  shapeFactory: LUCIDE_TEXT_ALIGN_CENTER_SHAPE_FACTORY,
});

export const asLucideTextAlignCenterIcon = fixed.asHook;
export const lucideTextAlignCenterIcon = fixed.prototype;
export default lucideTextAlignCenterIcon;
