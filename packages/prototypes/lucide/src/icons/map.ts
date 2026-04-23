// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map' as const;
export const LUCIDE_MAP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z',
  }),
  svg.path({ d: 'M15 5.764v15' }),
  svg.path({ d: 'M9 3.236v15' }),
];

export function renderLucideMapIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-icon',
  prototypeName: 'lucide-map-icon',
  shapeFactory: LUCIDE_MAP_SHAPE_FACTORY,
});

export const asLucideMapIcon = fixed.asHook;
export const lucideMapIcon = fixed.prototype;
export default lucideMapIcon;
