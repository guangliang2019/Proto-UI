// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'star-half' as const;
export const LUCIDE_STAR_HALF_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2',
  });

export function renderLucideStarHalfIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STAR_HALF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-star-half-icon',
  prototypeName: 'lucide-star-half-icon',
  shapeFactory: LUCIDE_STAR_HALF_SHAPE_FACTORY,
});

export const asLucideStarHalfIcon = fixed.asHook;
export const lucideStarHalfIcon = fixed.prototype;
export default lucideStarHalfIcon;
