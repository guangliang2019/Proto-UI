// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'egg-off' as const;
export const LUCIDE_EGG_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19' }),
  svg.path({ d: 'M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568' }),
];

export function renderLucideEggOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EGG_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-egg-off-icon',
  prototypeName: 'lucide-egg-off-icon',
  shapeFactory: LUCIDE_EGG_OFF_SHAPE_FACTORY,
});

export const asLucideEggOffIcon = fixed.asHook;
export const lucideEggOffIcon = fixed.prototype;
export default lucideEggOffIcon;
