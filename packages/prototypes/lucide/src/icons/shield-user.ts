// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shield-user' as const;
export const LUCIDE_SHIELD_USER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  }),
  svg.path({ d: 'M6.376 18.91a6 6 0 0 1 11.249.003' }),
  svg.circle({ cx: 12, cy: 11, r: 4 }),
];

export function renderLucideShieldUserIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHIELD_USER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shield-user-icon',
  prototypeName: 'lucide-shield-user-icon',
  shapeFactory: LUCIDE_SHIELD_USER_SHAPE_FACTORY,
});

export const asLucideShieldUserIcon = fixed.asHook;
export const lucideShieldUserIcon = fixed.prototype;
export default lucideShieldUserIcon;
