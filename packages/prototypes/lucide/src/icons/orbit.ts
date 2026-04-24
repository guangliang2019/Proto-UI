// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'orbit' as const;
export const LUCIDE_ORBIT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20.341 6.484A10 10 0 0 1 10.266 21.85' }),
  svg.path({ d: 'M3.659 17.516A10 10 0 0 1 13.74 2.152' }),
  svg.circle({ cx: 12, cy: 12, r: 3 }),
  svg.circle({ cx: 19, cy: 5, r: 2 }),
  svg.circle({ cx: 5, cy: 19, r: 2 }),
];

export function renderLucideOrbitIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ORBIT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-orbit-icon',
  prototypeName: 'lucide-orbit-icon',
  shapeFactory: LUCIDE_ORBIT_SHAPE_FACTORY,
});

export const asLucideOrbitIcon = fixed.asHook;
export const lucideOrbitIcon = fixed.prototype;
export default lucideOrbitIcon;
