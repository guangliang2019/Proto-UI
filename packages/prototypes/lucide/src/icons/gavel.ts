// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gavel' as const;
export const LUCIDE_GAVEL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381' }),
  svg.path({ d: 'm16 16 6-6' }),
  svg.path({ d: 'm21.5 10.5-8-8' }),
  svg.path({ d: 'm8 8 6-6' }),
  svg.path({ d: 'm8.5 7.5 8 8' }),
];

export function renderLucideGavelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GAVEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gavel-icon',
  prototypeName: 'lucide-gavel-icon',
  shapeFactory: LUCIDE_GAVEL_SHAPE_FACTORY,
});

export const asLucideGavelIcon = fixed.asHook;
export const lucideGavelIcon = fixed.prototype;
export default lucideGavelIcon;
