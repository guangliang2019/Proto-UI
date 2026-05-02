// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'house' as const;
export const LUCIDE_HOUSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' }),
  svg.path({
    d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  }),
];

export function renderLucideHouseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOUSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-house-icon',
  prototypeName: 'lucide-house-icon',
  shapeFactory: LUCIDE_HOUSE_SHAPE_FACTORY,
});

export const asLucideHouseIcon = fixed.asHook;
export const lucideHouseIcon = fixed.prototype;
export default lucideHouseIcon;
