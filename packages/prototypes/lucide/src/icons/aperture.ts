// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'aperture' as const;
export const LUCIDE_APERTURE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm14.31 8 5.74 9.94' }),
  svg.path({ d: 'M9.69 8h11.48' }),
  svg.path({ d: 'm7.38 12 5.74-9.94' }),
  svg.path({ d: 'M9.69 16 3.95 6.06' }),
  svg.path({ d: 'M14.31 16H2.83' }),
  svg.path({ d: 'm16.62 12-5.74 9.94' }),
];

export function renderLucideApertureIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_APERTURE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-aperture-icon',
  prototypeName: 'lucide-aperture-icon',
  shapeFactory: LUCIDE_APERTURE_SHAPE_FACTORY,
});

export const asLucideApertureIcon = fixed.asHook;
export const lucideApertureIcon = fixed.prototype;
export default lucideApertureIcon;
