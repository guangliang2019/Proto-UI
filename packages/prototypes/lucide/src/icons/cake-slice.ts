// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cake-slice' as const;
export const LUCIDE_CAKE_SLICE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 13H3' }),
  svg.path({ d: 'M16 17H3' }),
  svg.path({
    d: 'm7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6',
  }),
  svg.circle({ cx: 9, cy: 7, r: 2 }),
];

export function renderLucideCakeSliceIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CAKE_SLICE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cake-slice-icon',
  prototypeName: 'lucide-cake-slice-icon',
  shapeFactory: LUCIDE_CAKE_SLICE_SHAPE_FACTORY,
});

export const asLucideCakeSliceIcon = fixed.asHook;
export const lucideCakeSliceIcon = fixed.prototype;
export default lucideCakeSliceIcon;
