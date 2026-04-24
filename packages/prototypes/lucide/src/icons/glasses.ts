// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'glasses' as const;
export const LUCIDE_GLASSES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 6, cy: 15, r: 4 }),
  svg.circle({ cx: 18, cy: 15, r: 4 }),
  svg.path({ d: 'M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2' }),
  svg.path({ d: 'M2.5 13 5 7c.7-1.3 1.4-2 3-2' }),
  svg.path({ d: 'M21.5 13 19 7c-.7-1.3-1.5-2-3-2' }),
];

export function renderLucideGlassesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GLASSES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-glasses-icon',
  prototypeName: 'lucide-glasses-icon',
  shapeFactory: LUCIDE_GLASSES_SHAPE_FACTORY,
});

export const asLucideGlassesIcon = fixed.asHook;
export const lucideGlassesIcon = fixed.prototype;
export default lucideGlassesIcon;
