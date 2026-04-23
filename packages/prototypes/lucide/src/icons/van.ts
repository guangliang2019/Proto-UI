// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'van' as const;
export const LUCIDE_VAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3',
  }),
  svg.path({ d: 'M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2' }),
  svg.path({ d: 'M9 18h5' }),
  svg.circle({ cx: 16, cy: 18, r: 2 }),
  svg.circle({ cx: 7, cy: 18, r: 2 }),
];

export function renderLucideVanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-van-icon',
  prototypeName: 'lucide-van-icon',
  shapeFactory: LUCIDE_VAN_SHAPE_FACTORY,
});

export const asLucideVanIcon = fixed.asHook;
export const lucideVanIcon = fixed.prototype;
export default lucideVanIcon;
