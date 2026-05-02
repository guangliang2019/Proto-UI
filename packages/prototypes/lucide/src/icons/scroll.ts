// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scroll' as const;
export const LUCIDE_SCROLL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 17V5a2 2 0 0 0-2-2H4' }),
  svg.path({
    d: 'M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3',
  }),
];

export function renderLucideScrollIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCROLL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scroll-icon',
  prototypeName: 'lucide-scroll-icon',
  shapeFactory: LUCIDE_SCROLL_SHAPE_FACTORY,
});

export const asLucideScrollIcon = fixed.asHook;
export const lucideScrollIcon = fixed.prototype;
export default lucideScrollIcon;
