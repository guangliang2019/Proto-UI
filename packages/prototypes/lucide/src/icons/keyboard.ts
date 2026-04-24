// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'keyboard' as const;
export const LUCIDE_KEYBOARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 8h.01' }),
  svg.path({ d: 'M12 12h.01' }),
  svg.path({ d: 'M14 8h.01' }),
  svg.path({ d: 'M16 12h.01' }),
  svg.path({ d: 'M18 8h.01' }),
  svg.path({ d: 'M6 8h.01' }),
  svg.path({ d: 'M7 16h10' }),
  svg.path({ d: 'M8 12h.01' }),
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
];

export function renderLucideKeyboardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_KEYBOARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-keyboard-icon',
  prototypeName: 'lucide-keyboard-icon',
  shapeFactory: LUCIDE_KEYBOARD_SHAPE_FACTORY,
});

export const asLucideKeyboardIcon = fixed.asHook;
export const lucideKeyboardIcon = fixed.prototype;
export default lucideKeyboardIcon;
