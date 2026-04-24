// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'house-heart' as const;
export const LUCIDE_HOUSE_HEART_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z',
  }),
  svg.path({
    d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  }),
];

export function renderLucideHouseHeartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOUSE_HEART_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-house-heart-icon',
  prototypeName: 'lucide-house-heart-icon',
  shapeFactory: LUCIDE_HOUSE_HEART_SHAPE_FACTORY,
});

export const asLucideHouseHeartIcon = fixed.asHook;
export const lucideHouseHeartIcon = fixed.prototype;
export default lucideHouseHeartIcon;
