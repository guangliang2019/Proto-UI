// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'door-open' as const;
export const LUCIDE_DOOR_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 20H2' }),
  svg.path({
    d: 'M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z',
  }),
  svg.path({ d: 'M11 4H8a2 2 0 0 0-2 2v14' }),
  svg.path({ d: 'M14 12h.01' }),
  svg.path({ d: 'M22 20h-3' }),
];

export function renderLucideDoorOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DOOR_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-door-open-icon',
  prototypeName: 'lucide-door-open-icon',
  shapeFactory: LUCIDE_DOOR_OPEN_SHAPE_FACTORY,
});

export const asLucideDoorOpenIcon = fixed.asHook;
export const lucideDoorOpenIcon = fixed.prototype;
export default lucideDoorOpenIcon;
