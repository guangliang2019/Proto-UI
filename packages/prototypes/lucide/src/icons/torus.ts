// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'torus' as const;
export const LUCIDE_TORUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.ellipse({ cx: 12, cy: 11, rx: 3, ry: 2 }),
  svg.ellipse({ cx: 12, cy: 12.5, rx: 10, ry: 8.5 }),
];

export function renderLucideTorusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TORUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-torus-icon',
  prototypeName: 'lucide-torus-icon',
  shapeFactory: LUCIDE_TORUS_SHAPE_FACTORY,
});

export const asLucideTorusIcon = fixed.asHook;
export const lucideTorusIcon = fixed.prototype;
export default lucideTorusIcon;
