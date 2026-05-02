// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'volume-x' as const;
export const LUCIDE_VOLUME_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
  }),
  svg.line({ x1: 22, x2: 16, y1: 9, y2: 15 }),
  svg.line({ x1: 16, x2: 22, y1: 9, y2: 15 }),
];

export function renderLucideVolumeXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VOLUME_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-volume-x-icon',
  prototypeName: 'lucide-volume-x-icon',
  shapeFactory: LUCIDE_VOLUME_X_SHAPE_FACTORY,
});

export const asLucideVolumeXIcon = fixed.asHook;
export const lucideVolumeXIcon = fixed.prototype;
export default lucideVolumeXIcon;
