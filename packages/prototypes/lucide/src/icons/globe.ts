// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'globe' as const;
export const LUCIDE_GLOBE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' }),
  svg.path({ d: 'M2 12h20' }),
];

export function renderLucideGlobeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GLOBE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-globe-icon',
  prototypeName: 'lucide-globe-icon',
  shapeFactory: LUCIDE_GLOBE_SHAPE_FACTORY,
});

export const asLucideGlobeIcon = fixed.asHook;
export const lucideGlobeIcon = fixed.prototype;
export default lucideGlobeIcon;
