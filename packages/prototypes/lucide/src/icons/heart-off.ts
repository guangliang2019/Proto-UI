// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heart-off' as const;
export const LUCIDE_HEART_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655',
  }),
  svg.path({
    d: 'm16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761',
  }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideHeartOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEART_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heart-off-icon',
  prototypeName: 'lucide-heart-off-icon',
  shapeFactory: LUCIDE_HEART_OFF_SHAPE_FACTORY,
});

export const asLucideHeartOffIcon = fixed.asHook;
export const lucideHeartOffIcon = fixed.prototype;
export default lucideHeartOffIcon;
