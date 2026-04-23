// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'leaf' as const;
export const LUCIDE_LEAF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z',
  }),
  svg.path({ d: 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' }),
];

export function renderLucideLeafIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LEAF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-leaf-icon',
  prototypeName: 'lucide-leaf-icon',
  shapeFactory: LUCIDE_LEAF_SHAPE_FACTORY,
});

export const asLucideLeafIcon = fixed.asHook;
export const lucideLeafIcon = fixed.prototype;
export default lucideLeafIcon;
