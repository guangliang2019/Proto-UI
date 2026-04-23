// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'volume-off' as const;
export const LUCIDE_VOLUME_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 9a5 5 0 0 1 .95 2.293' }),
  svg.path({ d: 'M19.364 5.636a9 9 0 0 1 1.889 9.96' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({
    d: 'm7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11',
  }),
  svg.path({ d: 'M9.828 4.172A.686.686 0 0 1 11 4.657v.686' }),
];

export function renderLucideVolumeOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VOLUME_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-volume-off-icon',
  prototypeName: 'lucide-volume-off-icon',
  shapeFactory: LUCIDE_VOLUME_OFF_SHAPE_FACTORY,
});

export const asLucideVolumeOffIcon = fixed.asHook;
export const lucideVolumeOffIcon = fixed.prototype;
export default lucideVolumeOffIcon;
