// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-plus' as const;
export const LUCIDE_MAP_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12',
  }),
  svg.path({ d: 'M15 5.764V12' }),
  svg.path({ d: 'M18 15v6' }),
  svg.path({ d: 'M21 18h-6' }),
  svg.path({ d: 'M9 3.236v15' }),
];

export function renderLucideMapPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-plus-icon',
  prototypeName: 'lucide-map-plus-icon',
  shapeFactory: LUCIDE_MAP_PLUS_SHAPE_FACTORY,
});

export const asLucideMapPlusIcon = fixed.asHook;
export const lucideMapPlusIcon = fixed.prototype;
export default lucideMapPlusIcon;
