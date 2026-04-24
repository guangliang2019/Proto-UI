// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'view' as const;
export const LUCIDE_VIEW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2' }),
  svg.path({ d: 'M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2' }),
  svg.circle({ cx: 12, cy: 12, r: 1 }),
  svg.path({
    d: 'M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0',
  }),
];

export function renderLucideViewIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VIEW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-view-icon',
  prototypeName: 'lucide-view-icon',
  shapeFactory: LUCIDE_VIEW_SHAPE_FACTORY,
});

export const asLucideViewIcon = fixed.asHook;
export const lucideViewIcon = fixed.prototype;
export default lucideViewIcon;
