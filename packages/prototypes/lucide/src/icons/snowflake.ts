// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'snowflake' as const;
export const LUCIDE_SNOWFLAKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 20-1.25-2.5L6 18' }),
  svg.path({ d: 'M10 4 8.75 6.5 6 6' }),
  svg.path({ d: 'm14 20 1.25-2.5L18 18' }),
  svg.path({ d: 'm14 4 1.25 2.5L18 6' }),
  svg.path({ d: 'm17 21-3-6h-4' }),
  svg.path({ d: 'm17 3-3 6 1.5 3' }),
  svg.path({ d: 'M2 12h6.5L10 9' }),
  svg.path({ d: 'm20 10-1.5 2 1.5 2' }),
  svg.path({ d: 'M22 12h-6.5L14 15' }),
  svg.path({ d: 'm4 10 1.5 2L4 14' }),
  svg.path({ d: 'm7 21 3-6-1.5-3' }),
  svg.path({ d: 'm7 3 3 6h4' }),
];

export function renderLucideSnowflakeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SNOWFLAKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-snowflake-icon',
  prototypeName: 'lucide-snowflake-icon',
  shapeFactory: LUCIDE_SNOWFLAKE_SHAPE_FACTORY,
});

export const asLucideSnowflakeIcon = fixed.asHook;
export const lucideSnowflakeIcon = fixed.prototype;
export default lucideSnowflakeIcon;
