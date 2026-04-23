// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tornado' as const;
export const LUCIDE_TORNADO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 4H3' }),
  svg.path({ d: 'M18 8H6' }),
  svg.path({ d: 'M19 12H9' }),
  svg.path({ d: 'M16 16h-6' }),
  svg.path({ d: 'M11 20H9' }),
];

export function renderLucideTornadoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TORNADO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tornado-icon',
  prototypeName: 'lucide-tornado-icon',
  shapeFactory: LUCIDE_TORNADO_SHAPE_FACTORY,
});

export const asLucideTornadoIcon = fixed.asHook;
export const lucideTornadoIcon = fixed.prototype;
export default lucideTornadoIcon;
