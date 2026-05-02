// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'construction' as const;
export const LUCIDE_CONSTRUCTION_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 2, y: 6, width: 20, height: 8, rx: 1 }),
  svg.path({ d: 'M17 14v7' }),
  svg.path({ d: 'M7 14v7' }),
  svg.path({ d: 'M17 3v3' }),
  svg.path({ d: 'M7 3v3' }),
  svg.path({ d: 'M10 14 2.3 6.3' }),
  svg.path({ d: 'm14 6 7.7 7.7' }),
  svg.path({ d: 'm8 6 8 8' }),
];

export function renderLucideConstructionIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CONSTRUCTION_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-construction-icon',
  prototypeName: 'lucide-construction-icon',
  shapeFactory: LUCIDE_CONSTRUCTION_SHAPE_FACTORY,
});

export const asLucideConstructionIcon = fixed.asHook;
export const lucideConstructionIcon = fixed.prototype;
export default lucideConstructionIcon;
