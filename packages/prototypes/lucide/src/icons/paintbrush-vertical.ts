// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'paintbrush-vertical' as const;
export const LUCIDE_PAINTBRUSH_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2v2' }),
  svg.path({ d: 'M14 2v4' }),
  svg.path({ d: 'M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z' }),
  svg.path({
    d: 'M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1',
  }),
];

export function renderLucidePaintbrushVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PAINTBRUSH_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-paintbrush-vertical-icon',
  prototypeName: 'lucide-paintbrush-vertical-icon',
  shapeFactory: LUCIDE_PAINTBRUSH_VERTICAL_SHAPE_FACTORY,
});

export const asLucidePaintbrushVerticalIcon = fixed.asHook;
export const lucidePaintbrushVerticalIcon = fixed.prototype;
export default lucidePaintbrushVerticalIcon;
