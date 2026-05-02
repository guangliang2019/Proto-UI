// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'air-vent' as const;
export const LUCIDE_AIR_VENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 17.5a2.5 2.5 0 1 1-4 2.03V12' }),
  svg.path({ d: 'M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M6 8h12' }),
  svg.path({ d: 'M6.6 15.572A2 2 0 1 0 10 17v-5' }),
];

export function renderLucideAirVentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AIR_VENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-air-vent-icon',
  prototypeName: 'lucide-air-vent-icon',
  shapeFactory: LUCIDE_AIR_VENT_SHAPE_FACTORY,
});

export const asLucideAirVentIcon = fixed.asHook;
export const lucideAirVentIcon = fixed.prototype;
export default lucideAirVentIcon;
