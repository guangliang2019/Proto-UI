// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-narrow-wide' as const;
export const LUCIDE_ARROW_UP_NARROW_WIDE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 8 4-4 4 4' }),
  svg.path({ d: 'M7 4v16' }),
  svg.path({ d: 'M11 12h4' }),
  svg.path({ d: 'M11 16h7' }),
  svg.path({ d: 'M11 20h10' }),
];

export function renderLucideArrowUpNarrowWideIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_NARROW_WIDE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-narrow-wide-icon',
  prototypeName: 'lucide-arrow-up-narrow-wide-icon',
  shapeFactory: LUCIDE_ARROW_UP_NARROW_WIDE_SHAPE_FACTORY,
});

export const asLucideArrowUpNarrowWideIcon = fixed.asHook;
export const lucideArrowUpNarrowWideIcon = fixed.prototype;
export default lucideArrowUpNarrowWideIcon;
