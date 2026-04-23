// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'brick-wall' as const;
export const LUCIDE_BRICK_WALL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M12 9v6' }),
  svg.path({ d: 'M16 15v6' }),
  svg.path({ d: 'M16 3v6' }),
  svg.path({ d: 'M3 15h18' }),
  svg.path({ d: 'M3 9h18' }),
  svg.path({ d: 'M8 15v6' }),
  svg.path({ d: 'M8 3v6' }),
];

export function renderLucideBrickWallIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRICK_WALL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-brick-wall-icon',
  prototypeName: 'lucide-brick-wall-icon',
  shapeFactory: LUCIDE_BRICK_WALL_SHAPE_FACTORY,
});

export const asLucideBrickWallIcon = fixed.asHook;
export const lucideBrickWallIcon = fixed.prototype;
export default lucideBrickWallIcon;
