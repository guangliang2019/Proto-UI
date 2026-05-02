// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shield-x' as const;
export const LUCIDE_SHIELD_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  }),
  svg.path({ d: 'm14.5 9.5-5 5' }),
  svg.path({ d: 'm9.5 9.5 5 5' }),
];

export function renderLucideShieldXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHIELD_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shield-x-icon',
  prototypeName: 'lucide-shield-x-icon',
  shapeFactory: LUCIDE_SHIELD_X_SHAPE_FACTORY,
});

export const asLucideShieldXIcon = fixed.asHook;
export const lucideShieldXIcon = fixed.prototype;
export default lucideShieldXIcon;
