// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cone' as const;
export const LUCIDE_CONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98' }),
  svg.ellipse({ cx: 12, cy: 19, rx: 9, ry: 3 }),
];

export function renderLucideConeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cone-icon',
  prototypeName: 'lucide-cone-icon',
  shapeFactory: LUCIDE_CONE_SHAPE_FACTORY,
});

export const asLucideConeIcon = fixed.asHook;
export const lucideConeIcon = fixed.prototype;
export default lucideConeIcon;
