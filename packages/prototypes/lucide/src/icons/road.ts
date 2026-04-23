// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'road' as const;
export const LUCIDE_ROAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M12 5V3' }),
  svg.path({ d: 'M12 9v3' }),
  svg.path({
    d: 'M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z',
  }),
];

export function renderLucideRoadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-road-icon',
  prototypeName: 'lucide-road-icon',
  shapeFactory: LUCIDE_ROAD_SHAPE_FACTORY,
});

export const asLucideRoadIcon = fixed.asHook;
export const lucideRoadIcon = fixed.prototype;
export default lucideRoadIcon;
