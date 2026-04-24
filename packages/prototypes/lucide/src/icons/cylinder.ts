// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cylinder' as const;
export const LUCIDE_CYLINDER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.ellipse({ cx: 12, cy: 5, rx: 9, ry: 3 }),
  svg.path({ d: 'M3 5v14a9 3 0 0 0 18 0V5' }),
];

export function renderLucideCylinderIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CYLINDER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cylinder-icon',
  prototypeName: 'lucide-cylinder-icon',
  shapeFactory: LUCIDE_CYLINDER_SHAPE_FACTORY,
});

export const asLucideCylinderIcon = fixed.asHook;
export const lucideCylinderIcon = fixed.prototype;
export default lucideCylinderIcon;
