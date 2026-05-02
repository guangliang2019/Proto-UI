// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'eye' as const;
export const LUCIDE_EYE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
  }),
  svg.circle({ cx: 12, cy: 12, r: 3 }),
];

export function renderLucideEyeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EYE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-eye-icon',
  prototypeName: 'lucide-eye-icon',
  shapeFactory: LUCIDE_EYE_SHAPE_FACTORY,
});

export const asLucideEyeIcon = fixed.asHook;
export const lucideEyeIcon = fixed.prototype;
export default lucideEyeIcon;
