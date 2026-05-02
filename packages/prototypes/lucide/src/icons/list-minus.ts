// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-minus' as const;
export const LUCIDE_LIST_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5H3' }),
  svg.path({ d: 'M11 12H3' }),
  svg.path({ d: 'M16 19H3' }),
  svg.path({ d: 'M21 12h-6' }),
];

export function renderLucideListMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-minus-icon',
  prototypeName: 'lucide-list-minus-icon',
  shapeFactory: LUCIDE_LIST_MINUS_SHAPE_FACTORY,
});

export const asLucideListMinusIcon = fixed.asHook;
export const lucideListMinusIcon = fixed.prototype;
export default lucideListMinusIcon;
