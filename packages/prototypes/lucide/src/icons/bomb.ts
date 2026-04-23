// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bomb' as const;
export const LUCIDE_BOMB_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11, cy: 13, r: 9 }),
  svg.path({
    d: 'M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95',
  }),
  svg.path({ d: 'm22 2-1.5 1.5' }),
];

export function renderLucideBombIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOMB_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bomb-icon',
  prototypeName: 'lucide-bomb-icon',
  shapeFactory: LUCIDE_BOMB_SHAPE_FACTORY,
});

export const asLucideBombIcon = fixed.asHook;
export const lucideBombIcon = fixed.prototype;
export default lucideBombIcon;
