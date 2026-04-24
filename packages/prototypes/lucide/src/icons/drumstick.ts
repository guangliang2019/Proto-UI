// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'drumstick' as const;
export const LUCIDE_DRUMSTICK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23' }),
  svg.path({ d: 'm8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59' }),
];

export function renderLucideDrumstickIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DRUMSTICK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-drumstick-icon',
  prototypeName: 'lucide-drumstick-icon',
  shapeFactory: LUCIDE_DRUMSTICK_SHAPE_FACTORY,
});

export const asLucideDrumstickIcon = fixed.asHook;
export const lucideDrumstickIcon = fixed.prototype;
export default lucideDrumstickIcon;
