// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rocking-chair' as const;
export const LUCIDE_ROCKING_CHAIR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 13 3.708 7.416' }),
  svg.path({ d: 'M3 19a15 15 0 0 0 18 0' }),
  svg.path({ d: 'm3 2 3.21 9.633A2 2 0 0 0 8.109 13H18' }),
  svg.path({ d: 'm9 13-3.708 7.416' }),
];

export function renderLucideRockingChairIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROCKING_CHAIR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rocking-chair-icon',
  prototypeName: 'lucide-rocking-chair-icon',
  shapeFactory: LUCIDE_ROCKING_CHAIR_SHAPE_FACTORY,
});

export const asLucideRockingChairIcon = fixed.asHook;
export const lucideRockingChairIcon = fixed.prototype;
export default lucideRockingChairIcon;
