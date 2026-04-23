// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heart-plus' as const;
export const LUCIDE_HEART_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49',
  }),
  svg.path({ d: 'M15 15h6' }),
  svg.path({ d: 'M18 12v6' }),
];

export function renderLucideHeartPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEART_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heart-plus-icon',
  prototypeName: 'lucide-heart-plus-icon',
  shapeFactory: LUCIDE_HEART_PLUS_SHAPE_FACTORY,
});

export const asLucideHeartPlusIcon = fixed.asHook;
export const lucideHeartPlusIcon = fixed.prototype;
export default lucideHeartPlusIcon;
