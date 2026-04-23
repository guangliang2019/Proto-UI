// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'joystick' as const;
export const LUCIDE_JOYSTICK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z' }),
  svg.path({ d: 'M6 15v-2' }),
  svg.path({ d: 'M12 15V9' }),
  svg.circle({ cx: 12, cy: 6, r: 3 }),
];

export function renderLucideJoystickIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_JOYSTICK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-joystick-icon',
  prototypeName: 'lucide-joystick-icon',
  shapeFactory: LUCIDE_JOYSTICK_SHAPE_FACTORY,
});

export const asLucideJoystickIcon = fixed.asHook;
export const lucideJoystickIcon = fixed.prototype;
export default lucideJoystickIcon;
