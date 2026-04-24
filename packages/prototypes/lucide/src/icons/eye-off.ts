// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'eye-off' as const;
export const LUCIDE_EYE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49',
  }),
  svg.path({ d: 'M14.084 14.158a3 3 0 0 1-4.242-4.242' }),
  svg.path({
    d: 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143',
  }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideEyeOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EYE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-eye-off-icon',
  prototypeName: 'lucide-eye-off-icon',
  shapeFactory: LUCIDE_EYE_OFF_SHAPE_FACTORY,
});

export const asLucideEyeOffIcon = fixed.asHook;
export const lucideEyeOffIcon = fixed.prototype;
export default lucideEyeOffIcon;
