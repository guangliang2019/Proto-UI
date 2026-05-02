// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'volume-1' as const;
export const LUCIDE_VOLUME_1_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
  }),
  svg.path({ d: 'M16 9a5 5 0 0 1 0 6' }),
];

export function renderLucideVolume1Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VOLUME_1_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-volume-1-icon',
  prototypeName: 'lucide-volume-1-icon',
  shapeFactory: LUCIDE_VOLUME_1_SHAPE_FACTORY,
});

export const asLucideVolume1Icon = fixed.asHook;
export const lucideVolume1Icon = fixed.prototype;
export default lucideVolume1Icon;
