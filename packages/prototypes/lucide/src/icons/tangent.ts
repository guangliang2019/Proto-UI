// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tangent' as const;
export const LUCIDE_TANGENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 17, cy: 4, r: 2 }),
  svg.path({ d: 'M15.59 5.41 5.41 15.59' }),
  svg.circle({ cx: 4, cy: 17, r: 2 }),
  svg.path({ d: 'M12 22s-4-9-1.5-11.5S22 12 22 12' }),
];

export function renderLucideTangentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TANGENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tangent-icon',
  prototypeName: 'lucide-tangent-icon',
  shapeFactory: LUCIDE_TANGENT_SHAPE_FACTORY,
});

export const asLucideTangentIcon = fixed.asHook;
export const lucideTangentIcon = fixed.prototype;
export default lucideTangentIcon;
