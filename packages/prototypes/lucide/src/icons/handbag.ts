// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'handbag' as const;
export const LUCIDE_HANDBAG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z',
  }),
  svg.path({ d: 'M8 11V6a4 4 0 0 1 8 0v5' }),
];

export function renderLucideHandbagIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HANDBAG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-handbag-icon',
  prototypeName: 'lucide-handbag-icon',
  shapeFactory: LUCIDE_HANDBAG_SHAPE_FACTORY,
});

export const asLucideHandbagIcon = fixed.asHook;
export const lucideHandbagIcon = fixed.prototype;
export default lucideHandbagIcon;
