// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-pi' as const;
export const LUCIDE_SQUARE_PI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7 7h10' }),
  svg.path({ d: 'M10 7v10' }),
  svg.path({ d: 'M16 17a2 2 0 0 1-2-2V7' }),
];

export function renderLucideSquarePiIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-pi-icon',
  prototypeName: 'lucide-square-pi-icon',
  shapeFactory: LUCIDE_SQUARE_PI_SHAPE_FACTORY,
});

export const asLucideSquarePiIcon = fixed.asHook;
export const lucideSquarePiIcon = fixed.prototype;
export default lucideSquarePiIcon;
