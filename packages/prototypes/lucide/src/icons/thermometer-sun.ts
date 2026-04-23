// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'thermometer-sun' as const;
export const LUCIDE_THERMOMETER_SUN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M12 8a4 4 0 0 0-1.645 7.647' }),
  svg.path({ d: 'M2 12h2' }),
  svg.path({ d: 'M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z' }),
  svg.path({ d: 'm4.93 4.93 1.41 1.41' }),
  svg.path({ d: 'm6.34 17.66-1.41 1.41' }),
];

export function renderLucideThermometerSunIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_THERMOMETER_SUN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-thermometer-sun-icon',
  prototypeName: 'lucide-thermometer-sun-icon',
  shapeFactory: LUCIDE_THERMOMETER_SUN_SHAPE_FACTORY,
});

export const asLucideThermometerSunIcon = fixed.asHook;
export const lucideThermometerSunIcon = fixed.prototype;
export default lucideThermometerSunIcon;
