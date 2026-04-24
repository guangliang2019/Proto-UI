// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'minus' as const;
export const LUCIDE_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => svg.path({ d: 'M5 12h14' });

export function renderLucideMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-minus-icon',
  prototypeName: 'lucide-minus-icon',
  shapeFactory: LUCIDE_MINUS_SHAPE_FACTORY,
});

export const asLucideMinusIcon = fixed.asHook;
export const lucideMinusIcon = fixed.prototype;
export default lucideMinusIcon;
