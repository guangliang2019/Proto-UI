// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-star' as const;
export const LUCIDE_USER_STAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z',
  }),
  svg.path({ d: 'M8 15H7a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 10, cy: 7, r: 4 }),
];

export function renderLucideUserStarIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_STAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-star-icon',
  prototypeName: 'lucide-user-star-icon',
  shapeFactory: LUCIDE_USER_STAR_SHAPE_FACTORY,
});

export const asLucideUserStarIcon = fixed.asHook;
export const lucideUserStarIcon = fixed.prototype;
export default lucideUserStarIcon;
