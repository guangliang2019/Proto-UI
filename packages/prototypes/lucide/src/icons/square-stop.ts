// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-stop' as const;
export const LUCIDE_SQUARE_STOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.rect({ x: 9, y: 9, width: 6, height: 6, rx: 1 }),
];

export function renderLucideSquareStopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_STOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-stop-icon',
  prototypeName: 'lucide-square-stop-icon',
  shapeFactory: LUCIDE_SQUARE_STOP_SHAPE_FACTORY,
});

export const asLucideSquareStopIcon = fixed.asHook;
export const lucideSquareStopIcon = fixed.prototype;
export default lucideSquareStopIcon;
