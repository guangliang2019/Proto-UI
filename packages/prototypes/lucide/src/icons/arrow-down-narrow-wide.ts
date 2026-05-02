// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down-narrow-wide' as const;
export const LUCIDE_ARROW_DOWN_NARROW_WIDE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 16 4 4 4-4' }),
  svg.path({ d: 'M7 20V4' }),
  svg.path({ d: 'M11 4h4' }),
  svg.path({ d: 'M11 8h7' }),
  svg.path({ d: 'M11 12h10' }),
];

export function renderLucideArrowDownNarrowWideIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_NARROW_WIDE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-narrow-wide-icon',
  prototypeName: 'lucide-arrow-down-narrow-wide-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_NARROW_WIDE_SHAPE_FACTORY,
});

export const asLucideArrowDownNarrowWideIcon = fixed.asHook;
export const lucideArrowDownNarrowWideIcon = fixed.prototype;
export default lucideArrowDownNarrowWideIcon;
