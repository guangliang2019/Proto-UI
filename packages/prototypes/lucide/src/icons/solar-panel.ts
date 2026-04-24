// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'solar-panel' as const;
export const LUCIDE_SOLAR_PANEL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 2h2' }),
  svg.path({ d: 'm14.28 14-4.56 8' }),
  svg.path({ d: 'm21 22-1.558-4H4.558' }),
  svg.path({ d: 'M3 10v2' }),
  svg.path({
    d: 'M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z',
  }),
  svg.path({ d: 'M7 2a4 4 0 0 1-4 4' }),
  svg.path({ d: 'm8.66 7.66 1.41 1.41' }),
];

export function renderLucideSolarPanelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SOLAR_PANEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-solar-panel-icon',
  prototypeName: 'lucide-solar-panel-icon',
  shapeFactory: LUCIDE_SOLAR_PANEL_SHAPE_FACTORY,
});

export const asLucideSolarPanelIcon = fixed.asHook;
export const lucideSolarPanelIcon = fixed.prototype;
export default lucideSolarPanelIcon;
