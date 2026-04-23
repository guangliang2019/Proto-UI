// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-dollar-sign' as const;
export const LUCIDE_CIRCLE_DOLLAR_SIGN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8' }),
  svg.path({ d: 'M12 18V6' }),
];

export function renderLucideCircleDollarSignIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_DOLLAR_SIGN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-dollar-sign-icon',
  prototypeName: 'lucide-circle-dollar-sign-icon',
  shapeFactory: LUCIDE_CIRCLE_DOLLAR_SIGN_SHAPE_FACTORY,
});

export const asLucideCircleDollarSignIcon = fixed.asHook;
export const lucideCircleDollarSignIcon = fixed.prototype;
export default lucideCircleDollarSignIcon;
