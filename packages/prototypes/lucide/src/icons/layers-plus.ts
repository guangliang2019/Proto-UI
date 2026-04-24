// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'layers-plus' as const;
export const LUCIDE_LAYERS_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z',
  }),
  svg.path({ d: 'M16 17h6' }),
  svg.path({ d: 'M19 14v6' }),
  svg.path({ d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178' }),
  svg.path({ d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962' }),
];

export function renderLucideLayersPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAYERS_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-layers-plus-icon',
  prototypeName: 'lucide-layers-plus-icon',
  shapeFactory: LUCIDE_LAYERS_PLUS_SHAPE_FACTORY,
});

export const asLucideLayersPlusIcon = fixed.asHook;
export const lucideLayersPlusIcon = fixed.prototype;
export default lucideLayersPlusIcon;
