// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tent' as const;
export const LUCIDE_TENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3.5 21 14 3' }),
  svg.path({ d: 'M20.5 21 10 3' }),
  svg.path({ d: 'M15.5 21 12 15l-3.5 6' }),
  svg.path({ d: 'M2 21h20' }),
];

export function renderLucideTentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tent-icon',
  prototypeName: 'lucide-tent-icon',
  shapeFactory: LUCIDE_TENT_SHAPE_FACTORY,
});

export const asLucideTentIcon = fixed.asHook;
export const lucideTentIcon = fixed.prototype;
export default lucideTentIcon;
