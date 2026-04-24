// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'door-closed' as const;
export const LUCIDE_DOOR_CLOSED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12h.01' }),
  svg.path({ d: 'M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14' }),
  svg.path({ d: 'M2 20h20' }),
];

export function renderLucideDoorClosedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DOOR_CLOSED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-door-closed-icon',
  prototypeName: 'lucide-door-closed-icon',
  shapeFactory: LUCIDE_DOOR_CLOSED_SHAPE_FACTORY,
});

export const asLucideDoorClosedIcon = fixed.asHook;
export const lucideDoorClosedIcon = fixed.prototype;
export default lucideDoorClosedIcon;
