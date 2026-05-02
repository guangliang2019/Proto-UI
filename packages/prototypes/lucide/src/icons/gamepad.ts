// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gamepad' as const;
export const LUCIDE_GAMEPAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 6, x2: 10, y1: 12, y2: 12 }),
  svg.line({ x1: 8, x2: 8, y1: 10, y2: 14 }),
  svg.line({ x1: 15, x2: 15.01, y1: 13, y2: 13 }),
  svg.line({ x1: 18, x2: 18.01, y1: 11, y2: 11 }),
  svg.rect({ width: 20, height: 12, x: 2, y: 6, rx: 2 }),
];

export function renderLucideGamepadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GAMEPAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gamepad-icon',
  prototypeName: 'lucide-gamepad-icon',
  shapeFactory: LUCIDE_GAMEPAD_SHAPE_FACTORY,
});

export const asLucideGamepadIcon = fixed.asHook;
export const lucideGamepadIcon = fixed.prototype;
export default lucideGamepadIcon;
