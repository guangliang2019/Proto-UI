// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrows-up-from-line' as const;
export const LUCIDE_ARROWS_UP_FROM_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm4 6 3-3 3 3' }),
  svg.path({ d: 'M7 17V3' }),
  svg.path({ d: 'm14 6 3-3 3 3' }),
  svg.path({ d: 'M17 17V3' }),
  svg.path({ d: 'M4 21h16' }),
];

export function renderLucideArrowsUpFromLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROWS_UP_FROM_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrows-up-from-line-icon',
  prototypeName: 'lucide-arrows-up-from-line-icon',
  shapeFactory: LUCIDE_ARROWS_UP_FROM_LINE_SHAPE_FACTORY,
});

export const asLucideArrowsUpFromLineIcon = fixed.asHook;
export const lucideArrowsUpFromLineIcon = fixed.prototype;
export default lucideArrowsUpFromLineIcon;
