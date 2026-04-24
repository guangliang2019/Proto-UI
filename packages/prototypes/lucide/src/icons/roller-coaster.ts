// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'roller-coaster' as const;
export const LUCIDE_ROLLER_COASTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 19V5' }),
  svg.path({ d: 'M10 19V6.8' }),
  svg.path({ d: 'M14 19v-7.8' }),
  svg.path({ d: 'M18 5v4' }),
  svg.path({ d: 'M18 19v-6' }),
  svg.path({ d: 'M22 19V9' }),
  svg.path({ d: 'M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65' }),
];

export function renderLucideRollerCoasterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROLLER_COASTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-roller-coaster-icon',
  prototypeName: 'lucide-roller-coaster-icon',
  shapeFactory: LUCIDE_ROLLER_COASTER_SHAPE_FACTORY,
});

export const asLucideRollerCoasterIcon = fixed.asHook;
export const lucideRollerCoasterIcon = fixed.prototype;
export default lucideRollerCoasterIcon;
