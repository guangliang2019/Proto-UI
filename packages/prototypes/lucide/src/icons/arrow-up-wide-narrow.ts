// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-wide-narrow' as const;
export const LUCIDE_ARROW_UP_WIDE_NARROW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 8 4-4 4 4' }),
  svg.path({ d: 'M7 4v16' }),
  svg.path({ d: 'M11 12h10' }),
  svg.path({ d: 'M11 16h7' }),
  svg.path({ d: 'M11 20h4' }),
];

export function renderLucideArrowUpWideNarrowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_WIDE_NARROW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-wide-narrow-icon',
  prototypeName: 'lucide-arrow-up-wide-narrow-icon',
  shapeFactory: LUCIDE_ARROW_UP_WIDE_NARROW_SHAPE_FACTORY,
});

export const asLucideArrowUpWideNarrowIcon = fixed.asHook;
export const lucideArrowUpWideNarrowIcon = fixed.prototype;
export default lucideArrowUpWideNarrowIcon;
