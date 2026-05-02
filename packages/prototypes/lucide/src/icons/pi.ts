// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pi' as const;
export const LUCIDE_PI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 9, x2: 9, y1: 4, y2: 20 }),
  svg.path({ d: 'M4 7c0-1.7 1.3-3 3-3h13' }),
  svg.path({ d: 'M18 20c-1.7 0-3-1.3-3-3V4' }),
];

export function renderLucidePiIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pi-icon',
  prototypeName: 'lucide-pi-icon',
  shapeFactory: LUCIDE_PI_SHAPE_FACTORY,
});

export const asLucidePiIcon = fixed.asHook;
export const lucidePiIcon = fixed.prototype;
export default lucidePiIcon;
