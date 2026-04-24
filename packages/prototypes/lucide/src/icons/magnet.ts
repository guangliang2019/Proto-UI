// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'magnet' as const;
export const LUCIDE_MAGNET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12 15 4 4' }),
  svg.path({
    d: 'M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z',
  }),
  svg.path({ d: 'm5 8 4 4' }),
];

export function renderLucideMagnetIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAGNET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-magnet-icon',
  prototypeName: 'lucide-magnet-icon',
  shapeFactory: LUCIDE_MAGNET_SHAPE_FACTORY,
});

export const asLucideMagnetIcon = fixed.asHook;
export const lucideMagnetIcon = fixed.prototype;
export default lucideMagnetIcon;
