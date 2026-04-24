// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-wrap' as const;
export const LUCIDE_TEXT_WRAP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 16-3 3 3 3' }),
  svg.path({ d: 'M3 12h14.5a1 1 0 0 1 0 7H13' }),
  svg.path({ d: 'M3 19h6' }),
  svg.path({ d: 'M3 5h18' }),
];

export function renderLucideTextWrapIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_WRAP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-wrap-icon',
  prototypeName: 'lucide-text-wrap-icon',
  shapeFactory: LUCIDE_TEXT_WRAP_SHAPE_FACTORY,
});

export const asLucideTextWrapIcon = fixed.asHook;
export const lucideTextWrapIcon = fixed.prototype;
export default lucideTextWrapIcon;
