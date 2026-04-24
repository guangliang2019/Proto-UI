// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'door-closed-locked' as const;
export const LUCIDE_DOOR_CLOSED_LOCKED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12h.01' }),
  svg.path({ d: 'M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14' }),
  svg.path({ d: 'M2 20h8' }),
  svg.path({ d: 'M20 17v-2a2 2 0 1 0-4 0v2' }),
  svg.rect({ x: 14, y: 17, width: 8, height: 5, rx: 1 }),
];

export function renderLucideDoorClosedLockedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DOOR_CLOSED_LOCKED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-door-closed-locked-icon',
  prototypeName: 'lucide-door-closed-locked-icon',
  shapeFactory: LUCIDE_DOOR_CLOSED_LOCKED_SHAPE_FACTORY,
});

export const asLucideDoorClosedLockedIcon = fixed.asHook;
export const lucideDoorClosedLockedIcon = fixed.prototype;
export default lucideDoorClosedLockedIcon;
