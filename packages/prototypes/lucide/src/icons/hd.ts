// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hd' as const;
export const LUCIDE_HD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12H6' }),
  svg.path({ d: 'M10 15V9' }),
  svg.path({
    d: 'M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z',
  }),
  svg.path({ d: 'M6 15V9' }),
  svg.rect({ x: 2, y: 5, width: 20, height: 14, rx: 2 }),
];

export function renderLucideHdIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hd-icon',
  prototypeName: 'lucide-hd-icon',
  shapeFactory: LUCIDE_HD_SHAPE_FACTORY,
});

export const asLucideHdIcon = fixed.asHook;
export const lucideHdIcon = fixed.prototype;
export default lucideHdIcon;
