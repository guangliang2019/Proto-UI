// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-dollar-sign' as const;
export const LUCIDE_BADGE_DOLLAR_SIGN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.path({ d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8' }),
  svg.path({ d: 'M12 18V6' }),
];

export function renderLucideBadgeDollarSignIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_DOLLAR_SIGN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-dollar-sign-icon',
  prototypeName: 'lucide-badge-dollar-sign-icon',
  shapeFactory: LUCIDE_BADGE_DOLLAR_SIGN_SHAPE_FACTORY,
});

export const asLucideBadgeDollarSignIcon = fixed.asHook;
export const lucideBadgeDollarSignIcon = fixed.prototype;
export default lucideBadgeDollarSignIcon;
