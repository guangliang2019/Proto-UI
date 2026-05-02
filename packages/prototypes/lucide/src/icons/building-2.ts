// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'building-2' as const;
export const LUCIDE_BUILDING_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12h4' }),
  svg.path({ d: 'M10 8h4' }),
  svg.path({ d: 'M14 21v-3a2 2 0 0 0-4 0v3' }),
  svg.path({ d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2' }),
  svg.path({ d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16' }),
];

export function renderLucideBuilding2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BUILDING_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-building-2-icon',
  prototypeName: 'lucide-building-2-icon',
  shapeFactory: LUCIDE_BUILDING_2_SHAPE_FACTORY,
});

export const asLucideBuilding2Icon = fixed.asHook;
export const lucideBuilding2Icon = fixed.prototype;
export default lucideBuilding2Icon;
