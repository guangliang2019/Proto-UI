// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-align-end' as const;
export const LUCIDE_TEXT_ALIGN_END_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 5H3' }),
  svg.path({ d: 'M21 12H9' }),
  svg.path({ d: 'M21 19H7' }),
];

export function renderLucideTextAlignEndIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_ALIGN_END_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-align-end-icon',
  prototypeName: 'lucide-text-align-end-icon',
  shapeFactory: LUCIDE_TEXT_ALIGN_END_SHAPE_FACTORY,
});

export const asLucideTextAlignEndIcon = fixed.asHook;
export const lucideTextAlignEndIcon = fixed.prototype;
export default lucideTextAlignEndIcon;
