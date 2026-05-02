// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'parentheses' as const;
export const LUCIDE_PARENTHESES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 21s-4-3-4-9 4-9 4-9' }),
  svg.path({ d: 'M16 3s4 3 4 9-4 9-4 9' }),
];

export function renderLucideParenthesesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PARENTHESES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-parentheses-icon',
  prototypeName: 'lucide-parentheses-icon',
  shapeFactory: LUCIDE_PARENTHESES_SHAPE_FACTORY,
});

export const asLucideParenthesesIcon = fixed.asHook;
export const lucideParenthesesIcon = fixed.prototype;
export default lucideParenthesesIcon;
