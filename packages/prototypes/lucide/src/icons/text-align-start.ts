// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-align-start' as const;
export const LUCIDE_TEXT_ALIGN_START_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 5H3' }),
  svg.path({ d: 'M15 12H3' }),
  svg.path({ d: 'M17 19H3' }),
];

export function renderLucideTextAlignStartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_ALIGN_START_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-align-start-icon',
  prototypeName: 'lucide-text-align-start-icon',
  shapeFactory: LUCIDE_TEXT_ALIGN_START_SHAPE_FACTORY,
});

export const asLucideTextAlignStartIcon = fixed.asHook;
export const lucideTextAlignStartIcon = fixed.prototype;
export default lucideTextAlignStartIcon;
