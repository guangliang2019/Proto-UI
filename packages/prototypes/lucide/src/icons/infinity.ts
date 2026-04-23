// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'infinity' as const;
export const LUCIDE_INFINITY_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8' });

export function renderLucideInfinityIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_INFINITY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-infinity-icon',
  prototypeName: 'lucide-infinity-icon',
  shapeFactory: LUCIDE_INFINITY_SHAPE_FACTORY,
});

export const asLucideInfinityIcon = fixed.asHook;
export const lucideInfinityIcon = fixed.prototype;
export default lucideInfinityIcon;
