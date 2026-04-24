// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shield-cog' as const;
export const LUCIDE_SHIELD_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10.929 14.467-.383.924' }),
  svg.path({ d: 'M10.929 8.923 10.546 8' }),
  svg.path({ d: 'M13.225 8.923 13.608 8' }),
  svg.path({ d: 'm13.607 15.391-.382-.924' }),
  svg.path({ d: 'm14.849 10.547.923-.383' }),
  svg.path({ d: 'm14.849 12.843.923.383' }),
  svg.path({
    d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  }),
  svg.path({ d: 'm9.305 10.547-.923-.383' }),
  svg.path({ d: 'm9.305 12.843-.923.383' }),
  svg.circle({ cx: 12.077, cy: 11.695, r: 3 }),
];

export function renderLucideShieldCogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHIELD_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shield-cog-icon',
  prototypeName: 'lucide-shield-cog-icon',
  shapeFactory: LUCIDE_SHIELD_COG_SHAPE_FACTORY,
});

export const asLucideShieldCogIcon = fixed.asHook;
export const lucideShieldCogIcon = fixed.prototype;
export default lucideShieldCogIcon;
