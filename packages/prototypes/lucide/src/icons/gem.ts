// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gem' as const;
export const LUCIDE_GEM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.5 3 8 9l4 13 4-13-2.5-6' }),
  svg.path({
    d: 'M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z',
  }),
  svg.path({ d: 'M2 9h20' }),
];

export function renderLucideGemIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GEM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gem-icon',
  prototypeName: 'lucide-gem-icon',
  shapeFactory: LUCIDE_GEM_SHAPE_FACTORY,
});

export const asLucideGemIcon = fixed.asHook;
export const lucideGemIcon = fixed.prototype;
export default lucideGemIcon;
