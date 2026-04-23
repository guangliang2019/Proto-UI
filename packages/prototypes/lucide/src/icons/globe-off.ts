// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'globe-off' as const;
export const LUCIDE_GLOBE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643' }),
  svg.path({ d: 'M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929' }),
  svg.path({ d: 'M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687' }),
  svg.path({ d: 'M17.656 12H22' }),
  svg.path({ d: 'M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45' }),
  svg.path({ d: 'M2 12h10' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideGlobeOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GLOBE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-globe-off-icon',
  prototypeName: 'lucide-globe-off-icon',
  shapeFactory: LUCIDE_GLOBE_OFF_SHAPE_FACTORY,
});

export const asLucideGlobeOffIcon = fixed.asHook;
export const lucideGlobeOffIcon = fixed.prototype;
export default lucideGlobeOffIcon;
