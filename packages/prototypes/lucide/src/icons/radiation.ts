// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radiation' as const;
export const LUCIDE_RADIATION_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12h.01' }),
  svg.path({
    d: 'M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z',
  }),
  svg.path({
    d: 'M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z',
  }),
  svg.path({
    d: 'M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z',
  }),
];

export function renderLucideRadiationIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADIATION_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radiation-icon',
  prototypeName: 'lucide-radiation-icon',
  shapeFactory: LUCIDE_RADIATION_SHAPE_FACTORY,
});

export const asLucideRadiationIcon = fixed.asHook;
export const lucideRadiationIcon = fixed.prototype;
export default lucideRadiationIcon;
