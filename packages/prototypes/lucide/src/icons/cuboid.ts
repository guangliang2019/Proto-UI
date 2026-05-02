// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cuboid' as const;
export const LUCIDE_CUBOID_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 22v-8' }),
  svg.path({ d: 'M2.336 8.89 10 14l11.715-7.029' }),
  svg.path({
    d: 'M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z',
  }),
];

export function renderLucideCuboidIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CUBOID_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cuboid-icon',
  prototypeName: 'lucide-cuboid-icon',
  shapeFactory: LUCIDE_CUBOID_SHAPE_FACTORY,
});

export const asLucideCuboidIcon = fixed.asHook;
export const lucideCuboidIcon = fixed.prototype;
export default lucideCuboidIcon;
