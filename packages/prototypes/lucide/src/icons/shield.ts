// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shield' as const;
export const LUCIDE_SHIELD_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  });

export function renderLucideShieldIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHIELD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shield-icon',
  prototypeName: 'lucide-shield-icon',
  shapeFactory: LUCIDE_SHIELD_SHAPE_FACTORY,
});

export const asLucideShieldIcon = fixed.asHook;
export const lucideShieldIcon = fixed.prototype;
export default lucideShieldIcon;
