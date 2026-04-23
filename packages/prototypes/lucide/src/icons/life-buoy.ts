// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'life-buoy' as const;
export const LUCIDE_LIFE_BUOY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm4.93 4.93 4.24 4.24' }),
  svg.path({ d: 'm14.83 9.17 4.24-4.24' }),
  svg.path({ d: 'm14.83 14.83 4.24 4.24' }),
  svg.path({ d: 'm9.17 14.83-4.24 4.24' }),
  svg.circle({ cx: 12, cy: 12, r: 4 }),
];

export function renderLucideLifeBuoyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIFE_BUOY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-life-buoy-icon',
  prototypeName: 'lucide-life-buoy-icon',
  shapeFactory: LUCIDE_LIFE_BUOY_SHAPE_FACTORY,
});

export const asLucideLifeBuoyIcon = fixed.asHook;
export const lucideLifeBuoyIcon = fixed.prototype;
export default lucideLifeBuoyIcon;
