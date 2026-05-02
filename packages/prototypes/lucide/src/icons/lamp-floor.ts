// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lamp-floor' as const;
export const LUCIDE_LAMP_FLOOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 10v12' }),
  svg.path({
    d: 'M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z',
  }),
  svg.path({ d: 'M9 22h6' }),
];

export function renderLucideLampFloorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAMP_FLOOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lamp-floor-icon',
  prototypeName: 'lucide-lamp-floor-icon',
  shapeFactory: LUCIDE_LAMP_FLOOR_SHAPE_FACTORY,
});

export const asLucideLampFloorIcon = fixed.asHook;
export const lucideLampFloorIcon = fixed.prototype;
export default lucideLampFloorIcon;
