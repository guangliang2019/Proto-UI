// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cable-car' as const;
export const LUCIDE_CABLE_CAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 3h.01' }),
  svg.path({ d: 'M14 2h.01' }),
  svg.path({ d: 'm2 9 20-5' }),
  svg.path({ d: 'M12 12V6.5' }),
  svg.rect({ width: 16, height: 10, x: 4, y: 12, rx: 3 }),
  svg.path({ d: 'M9 12v5' }),
  svg.path({ d: 'M15 12v5' }),
  svg.path({ d: 'M4 17h16' }),
];

export function renderLucideCableCarIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CABLE_CAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cable-car-icon',
  prototypeName: 'lucide-cable-car-icon',
  shapeFactory: LUCIDE_CABLE_CAR_SHAPE_FACTORY,
});

export const asLucideCableCarIcon = fixed.asHook;
export const lucideCableCarIcon = fixed.prototype;
export default lucideCableCarIcon;
