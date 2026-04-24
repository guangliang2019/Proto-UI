// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'turntable' as const;
export const LUCIDE_TURNTABLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12.01h.01' }),
  svg.path({ d: 'M18 8v4a8 8 0 0 1-1.07 4' }),
  svg.circle({ cx: 10, cy: 12, r: 4 }),
  svg.rect({ x: 2, y: 4, width: 20, height: 16, rx: 2 }),
];

export function renderLucideTurntableIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TURNTABLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-turntable-icon',
  prototypeName: 'lucide-turntable-icon',
  shapeFactory: LUCIDE_TURNTABLE_SHAPE_FACTORY,
});

export const asLucideTurntableIcon = fixed.asHook;
export const lucideTurntableIcon = fixed.prototype;
export default lucideTurntableIcon;
