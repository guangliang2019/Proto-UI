// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'parking-meter' as const;
export const LUCIDE_PARKING_METER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 15h2' }),
  svg.path({ d: 'M12 12v3' }),
  svg.path({ d: 'M12 19v3' }),
  svg.path({
    d: 'M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z',
  }),
  svg.path({ d: 'M9 9a3 3 0 1 1 6 0' }),
];

export function renderLucideParkingMeterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PARKING_METER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-parking-meter-icon',
  prototypeName: 'lucide-parking-meter-icon',
  shapeFactory: LUCIDE_PARKING_METER_SHAPE_FACTORY,
});

export const asLucideParkingMeterIcon = fixed.asHook;
export const lucideParkingMeterIcon = fixed.prototype;
export default lucideParkingMeterIcon;
