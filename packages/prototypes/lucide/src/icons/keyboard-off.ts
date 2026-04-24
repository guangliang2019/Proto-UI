// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'keyboard-off' as const;
export const LUCIDE_KEYBOARD_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M 20 4 A2 2 0 0 1 22 6' }),
  svg.path({ d: 'M 22 6 L 22 16.41' }),
  svg.path({ d: 'M 7 16 L 16 16' }),
  svg.path({ d: 'M 9.69 4 L 20 4' }),
  svg.path({ d: 'M14 8h.01' }),
  svg.path({ d: 'M18 8h.01' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2' }),
  svg.path({ d: 'M6 8h.01' }),
  svg.path({ d: 'M8 12h.01' }),
];

export function renderLucideKeyboardOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_KEYBOARD_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-keyboard-off-icon',
  prototypeName: 'lucide-keyboard-off-icon',
  shapeFactory: LUCIDE_KEYBOARD_OFF_SHAPE_FACTORY,
});

export const asLucideKeyboardOffIcon = fixed.asHook;
export const lucideKeyboardOffIcon = fixed.prototype;
export default lucideKeyboardOffIcon;
