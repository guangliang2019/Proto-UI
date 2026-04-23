// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'globe-x' as const;
export const LUCIDE_GLOBE_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 3 5 5' }),
  svg.path({ d: 'M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10' }),
  svg.path({ d: 'm21 3-5 5' }),
];

export function renderLucideGlobeXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GLOBE_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-globe-x-icon',
  prototypeName: 'lucide-globe-x-icon',
  shapeFactory: LUCIDE_GLOBE_X_SHAPE_FACTORY,
});

export const asLucideGlobeXIcon = fixed.asHook;
export const lucideGlobeXIcon = fixed.prototype;
export default lucideGlobeXIcon;
