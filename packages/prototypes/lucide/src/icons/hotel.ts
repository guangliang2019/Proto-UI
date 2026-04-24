// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hotel' as const;
export const LUCIDE_HOTEL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 22v-6.57' }),
  svg.path({ d: 'M12 11h.01' }),
  svg.path({ d: 'M12 7h.01' }),
  svg.path({ d: 'M14 15.43V22' }),
  svg.path({ d: 'M15 16a5 5 0 0 0-6 0' }),
  svg.path({ d: 'M16 11h.01' }),
  svg.path({ d: 'M16 7h.01' }),
  svg.path({ d: 'M8 11h.01' }),
  svg.path({ d: 'M8 7h.01' }),
  svg.rect({ x: 4, y: 2, width: 16, height: 20, rx: 2 }),
];

export function renderLucideHotelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOTEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hotel-icon',
  prototypeName: 'lucide-hotel-icon',
  shapeFactory: LUCIDE_HOTEL_SHAPE_FACTORY,
});

export const asLucideHotelIcon = fixed.asHook;
export const lucideHotelIcon = fixed.prototype;
export default lucideHotelIcon;
