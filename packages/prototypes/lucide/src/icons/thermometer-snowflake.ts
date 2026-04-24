// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'thermometer-snowflake' as const;
export const LUCIDE_THERMOMETER_SNOWFLAKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 20-1.25-2.5L6 18' }),
  svg.path({ d: 'M10 4 8.75 6.5 6 6' }),
  svg.path({ d: 'M10.585 15H10' }),
  svg.path({ d: 'M2 12h6.5L10 9' }),
  svg.path({ d: 'M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z' }),
  svg.path({ d: 'm4 10 1.5 2L4 14' }),
  svg.path({ d: 'm7 21 3-6-1.5-3' }),
  svg.path({ d: 'm7 3 3 6h2' }),
];

export function renderLucideThermometerSnowflakeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_THERMOMETER_SNOWFLAKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-thermometer-snowflake-icon',
  prototypeName: 'lucide-thermometer-snowflake-icon',
  shapeFactory: LUCIDE_THERMOMETER_SNOWFLAKE_SHAPE_FACTORY,
});

export const asLucideThermometerSnowflakeIcon = fixed.asHook;
export const lucideThermometerSnowflakeIcon = fixed.prototype;
export default lucideThermometerSnowflakeIcon;
