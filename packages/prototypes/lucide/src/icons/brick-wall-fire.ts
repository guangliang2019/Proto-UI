// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'brick-wall-fire' as const;
export const LUCIDE_BRICK_WALL_FIRE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 3v2.107' }),
  svg.path({
    d: 'M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9',
  }),
  svg.path({ d: 'M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938' }),
  svg.path({ d: 'M3 15h5.253' }),
  svg.path({ d: 'M3 9h8.228' }),
  svg.path({ d: 'M8 15v6' }),
  svg.path({ d: 'M8 3v6' }),
];

export function renderLucideBrickWallFireIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRICK_WALL_FIRE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-brick-wall-fire-icon',
  prototypeName: 'lucide-brick-wall-fire-icon',
  shapeFactory: LUCIDE_BRICK_WALL_FIRE_SHAPE_FACTORY,
});

export const asLucideBrickWallFireIcon = fixed.asHook;
export const lucideBrickWallFireIcon = fixed.prototype;
export default lucideBrickWallFireIcon;
