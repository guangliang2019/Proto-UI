// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'phone-off' as const;
export const LUCIDE_PHONE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272',
  }),
  svg.path({ d: 'M22 2 2 22' }),
  svg.path({
    d: 'M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473',
  }),
];

export function renderLucidePhoneOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PHONE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-phone-off-icon',
  prototypeName: 'lucide-phone-off-icon',
  shapeFactory: LUCIDE_PHONE_OFF_SHAPE_FACTORY,
});

export const asLucidePhoneOffIcon = fixed.asHook;
export const lucidePhoneOffIcon = fixed.prototype;
export default lucidePhoneOffIcon;
