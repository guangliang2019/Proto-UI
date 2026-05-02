// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'touchpad' as const;
export const LUCIDE_TOUCHPAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  svg.path({ d: 'M2 14h20' }),
  svg.path({ d: 'M12 20v-6' }),
];

export function renderLucideTouchpadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOUCHPAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-touchpad-icon',
  prototypeName: 'lucide-touchpad-icon',
  shapeFactory: LUCIDE_TOUCHPAD_SHAPE_FACTORY,
});

export const asLucideTouchpadIcon = fixed.asHook;
export const lucideTouchpadIcon = fixed.prototype;
export default lucideTouchpadIcon;
